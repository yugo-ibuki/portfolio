'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Application, CanvasTextOptions, Text, TextStyleOptions } from 'pixi.js'
import type { GlitchFilter } from 'pixi-filters/glitch'
import { PAGE_TRANSITION_DURATION_MS } from '@/lib/motion'

const HEADING_SELECTOR = '[data-pixi-glitch]'
const EFFECT_DURATION_MS = 500
const MAX_RENDER_PIXELS = 5_000_000

export type HeadingIntersection = {
  target: Element
  isIntersecting: boolean
}

type Observer = {
  observe(target: Element): void
  disconnect(): void
}

type HeadingGlitchController = {
  mount(): void
  destroy(): void
}

type ControllerOptions = {
  document: Document
  window: Window
  createObserver(onEntries: (entries: HeadingIntersection[]) => void): Observer
  shouldReduceMotion(): boolean
  subscribeReducedMotion?(onChange: () => void): () => void
  play(target: Element, signal: AbortSignal): void | Promise<void>
}

export const createHeadingGlitchController = ({
  document,
  createObserver,
  shouldReduceMotion,
  subscribeReducedMotion,
  play,
}: ControllerOptions): HeadingGlitchController => {
  const visible = new Set<Element>()
  const played = new WeakSet<Element>()
  const active = new Map<Element, AbortController>()
  let observer: Observer | undefined
  let unsubscribeReducedMotion: (() => void) | undefined
  let isMounted = false

  const cancelActive = () => {
    active.forEach((controller) => controller.abort())
  }

  const tryPlay = (target: Element) => {
    if (!isMounted || played.has(target) || active.has(target) || shouldReduceMotion()) return

    played.add(target)
    const controller = new AbortController()
    active.set(target, controller)
    Promise.resolve(play(target, controller.signal))
      .catch(() => undefined)
      .finally(() => {
        if (active.get(target) !== controller) return
        active.delete(target)
        if (visible.has(target)) tryPlay(target)
      })
  }

  const onIntersections = (entries: HeadingIntersection[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        visible.add(entry.target)
        tryPlay(entry.target)
      } else {
        visible.delete(entry.target)
        played.delete(entry.target)
        const controller = active.get(entry.target)
        if (controller) {
          controller.abort()
        }
      }
    }
  }

  return {
    mount() {
      if (isMounted) return
      isMounted = true
      observer = createObserver(onIntersections)
      document.querySelectorAll(HEADING_SELECTOR).forEach((target) => observer?.observe(target))
      unsubscribeReducedMotion = subscribeReducedMotion?.(() => {
        if (shouldReduceMotion()) cancelActive()
      })
    },
    destroy() {
      if (!isMounted) return
      isMounted = false
      unsubscribeReducedMotion?.()
      observer?.disconnect()
      cancelActive()
      visible.clear()
    },
  }
}

export const runWithSourceTextHidden = async (
  element: HTMLElement,
  firstRender: () => void | Promise<void>,
  effect: () => void | Promise<void>
) => {
  const previousColor = element.style.getPropertyValue('color')
  const previousPriority = element.style.getPropertyPriority('color')

  await firstRender()
  element.style.setProperty('color', 'transparent', 'important')

  try {
    await effect()
  } finally {
    if (previousColor) {
      element.style.setProperty('color', previousColor, previousPriority)
    } else {
      element.style.removeProperty('color')
    }
  }
}

type PositionedText = {
  x: number
  y: number
  style: {
    wordWrapWidth: number
  }
}

export const syncTextToTarget = (
  target: Element,
  text: PositionedText,
  viewport: { width: number; height: number }
) => {
  const rect = target.getBoundingClientRect()
  const isVisible =
    rect.bottom > 0 && rect.top < viewport.height && rect.right > 0 && rect.left < viewport.width

  if (!isVisible) return false

  text.x = rect.left
  text.y = rect.top
  if (Math.abs(text.style.wordWrapWidth - rect.width) > 1) {
    text.style.wordWrapWidth = rect.width
  }
  return true
}

type ActiveEffect = {
  filter: GlitchFilter
  text: Text
  target: HTMLElement
  startedAt: number
  resolve(): void
  signal: AbortSignal
  onAbort(): void
}

class SharedPixiHeadingPlayer {
  private app: Application | undefined
  private initPromise: Promise<Application> | undefined
  private effects = new Set<ActiveEffect>()
  private filterPool: GlitchFilter[] = []
  private destroyFilter: ((filter: GlitchFilter) => void) | undefined
  private animationFrame: number | undefined
  private pendingPlays = 0
  private isDestroyed = false

  constructor(
    private readonly document: Document,
    private readonly window: Window
  ) {}

  async play(target: Element, signal: AbortSignal) {
    if (!(target instanceof HTMLElement) || signal.aborted || this.isDestroyed) return

    const app = await this.getApplication()
    if (signal.aborted || this.isDestroyed) return

    const [{ Shader, Text }, { GlitchFilter }] = await Promise.all([
      import('pixi.js'),
      import('pixi-filters/glitch'),
    ])
    if (signal.aborted || this.isDestroyed) return
    this.destroyFilter ??= (filter) => {
      Shader.prototype.destroy.call(filter)
      filter.destroy()
    }

    const rect = target.getBoundingClientRect()
    const computed = this.window.getComputedStyle(target)
    const fontSize = Number.parseFloat(computed.fontSize) || 16
    const lineHeight = Number.parseFloat(computed.lineHeight) || fontSize * 1.2
    const letterSpacing = Number.parseFloat(computed.letterSpacing) || 0
    const textAlign = ['center', 'right', 'justify'].includes(computed.textAlign)
      ? (computed.textAlign as 'center' | 'right' | 'justify')
      : 'left'
    const textOptions: CanvasTextOptions = {
      text: target.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      style: {
        align: textAlign,
        fill: computed.color,
        fontFamily: computed.fontFamily,
        fontSize,
        fontStyle: computed.fontStyle as TextStyleOptions['fontStyle'],
        fontVariant: computed.fontVariant as TextStyleOptions['fontVariant'],
        fontWeight: computed.fontWeight as TextStyleOptions['fontWeight'],
        letterSpacing,
        lineHeight,
        padding: 28,
        whiteSpace: 'normal',
        wordWrap: rect.height > lineHeight * 1.4,
        wordWrapWidth: rect.width,
      },
    }
    const text = new Text(textOptions)
    const filter =
      this.filterPool.pop() ??
      new GlitchFilter({
        slices: 7,
        average: false,
      })
    filter.offset = Math.max(10, Math.min(24, fontSize * 0.42))
    filter.direction = 0
    filter.red = [-5, 0]
    filter.green = [0, 0]
    filter.blue = [5, 0]
    filter.refresh()

    text.filters = [filter]
    if (
      !syncTextToTarget(target, text, {
        width: this.window.innerWidth,
        height: this.window.innerHeight,
      })
    ) {
      this.filterPool.push(filter)
      text.destroy()
      return
    }
    app.stage.addChild(text)
    this.pendingPlays += 1

    try {
      await runWithSourceTextHidden(
        target,
        () => app.render(),
        () => this.animate(target, text, filter, signal)
      )
    } finally {
      app.stage.removeChild(text)
      text.filters = null
      try {
        app.render()
      } catch {
        // Source text is already restored; cleanup still needs to finish.
      } finally {
        this.filterPool.push(filter)
        try {
          text.destroy()
        } catch {
          // Ignore cleanup-only text failures.
        }
        this.pendingPlays -= 1
        if (this.isDestroyed && this.pendingPlays === 0) this.destroyApplication()
      }
    }
  }

  destroy() {
    if (this.isDestroyed) return
    this.isDestroyed = true
    if (this.animationFrame !== undefined) this.window.cancelAnimationFrame(this.animationFrame)
    this.animationFrame = undefined
    this.effects.forEach((effect) => this.finish(effect))
    this.window.removeEventListener('resize', this.resize)
    if (this.pendingPlays === 0) this.destroyApplication()
  }

  private readonly resize = () => {
    if (!this.app || this.isDestroyed) return
    this.app.renderer.resize(this.window.innerWidth, this.window.innerHeight, this.getResolution())
    this.app.render()
  }

  private async getApplication() {
    if (this.app) return this.app
    if (this.initPromise) return this.initPromise

    this.initPromise = (async () => {
      const { Application } = await import('pixi.js')
      const app = new Application()
      await app.init({
        autoStart: false,
        preference: 'webgl',
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        width: this.window.innerWidth,
        height: this.window.innerHeight,
        resolution: this.getResolution(),
      })

      if (this.isDestroyed) {
        app.destroy({ removeView: true }, { children: true })
        throw new Error('Pixi heading player was destroyed during initialization')
      }

      const canvas = app.canvas as HTMLCanvasElement
      canvas.setAttribute('aria-hidden', 'true')
      canvas.style.position = 'fixed'
      canvas.style.inset = '0'
      canvas.style.zIndex = '2147483647'
      canvas.style.pointerEvents = 'none'
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'
      this.document.body.appendChild(canvas)
      this.window.addEventListener('resize', this.resize, { passive: true })
      this.app = app
      return app
    })()

    return this.initPromise
  }

  private animate(target: HTMLElement, text: Text, filter: GlitchFilter, signal: AbortSignal) {
    if (signal.aborted) return Promise.resolve()

    return new Promise<void>((resolve) => {
      const effect: ActiveEffect = {
        filter,
        text,
        target,
        startedAt: this.window.performance.now(),
        resolve,
        signal,
        onAbort: () => this.finish(effect),
      }
      this.effects.add(effect)
      signal.addEventListener('abort', effect.onAbort, { once: true })
      this.startAnimationLoop()
    })
  }

  private startAnimationLoop() {
    if (this.animationFrame !== undefined || this.isDestroyed) return

    const renderFrame = (now: number) => {
      this.animationFrame = undefined
      if (!this.app || this.isDestroyed) return

      for (const effect of Array.from(this.effects)) {
        if (effect.signal.aborted || now - effect.startedAt >= EFFECT_DURATION_MS) {
          this.finish(effect)
          continue
        }
        if (
          !effect.target.isConnected ||
          !syncTextToTarget(effect.target, effect.text, {
            width: this.window.innerWidth,
            height: this.window.innerHeight,
          })
        ) {
          this.finish(effect)
          continue
        }
        const progress = (now - effect.startedAt) / EFFECT_DURATION_MS
        effect.filter.seed = Math.random()
        effect.filter.offset = 8 + Math.sin(progress * Math.PI) * 20
        effect.filter.shuffle()
        effect.filter.redraw()
        effect.text.alpha = progress < 0.18 || (progress > 0.42 && progress < 0.58) ? 0.72 : 1
      }

      this.app.render()
      if (this.effects.size > 0) {
        this.animationFrame = this.window.requestAnimationFrame(renderFrame)
      }
    }

    this.animationFrame = this.window.requestAnimationFrame(renderFrame)
  }

  private finish(effect: ActiveEffect) {
    if (!this.effects.delete(effect)) return
    effect.signal.removeEventListener('abort', effect.onAbort)
    effect.resolve()
  }

  private getResolution() {
    const viewportPixels = Math.max(1, this.window.innerWidth * this.window.innerHeight)
    const pixelBudgetResolution = Math.sqrt(MAX_RENDER_PIXELS / viewportPixels)
    return Math.max(0.5, Math.min(this.window.devicePixelRatio || 1, 1.5, pixelBudgetResolution))
  }

  private destroyApplication() {
    if (!this.app) return
    const app = this.app
    const filters = this.filterPool.splice(0)

    try {
      for (const filter of filters) {
        try {
          this.destroyFilter?.(filter)
        } catch {
          // Continue releasing the remaining pooled resources.
        }
      }
    } finally {
      app.destroy({ removeView: true }, { children: true })
      this.app = undefined
      this.initPromise = undefined
      this.destroyFilter = undefined
    }
  }
}

export const PixiHeadingGlitch = () => {
  const pathname = usePathname()

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let player: SharedPixiHeadingPlayer | undefined
    const controller = createHeadingGlitchController({
      document,
      window,
      createObserver: (onEntries) => {
        const observer = new IntersectionObserver(onEntries, { threshold: 0.45 })
        return observer
      },
      shouldReduceMotion: () => media.matches,
      subscribeReducedMotion: (onChange) => {
        media.addEventListener('change', onChange)
        return () => media.removeEventListener('change', onChange)
      },
      play: (target, signal) => {
        player ??= new SharedPixiHeadingPlayer(document, window)
        return player.play(target, signal)
      },
    })

    const mountTimer = window.setTimeout(() => controller.mount(), PAGE_TRANSITION_DURATION_MS)
    return () => {
      window.clearTimeout(mountTimer)
      controller.destroy()
      player?.destroy()
    }
  }, [pathname])

  return null
}
