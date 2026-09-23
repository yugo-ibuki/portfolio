import { afterEach, describe, expect, test } from 'bun:test'
import {
  createHeadingGlitchController,
  runWithSourceTextHidden,
  syncTextToTarget,
  type HeadingIntersection,
} from './PixiHeadingGlitch'

type ObserverHarness = {
  emit(entries: HeadingIntersection[]): void
  disconnectCount: number
}

const mountedControllers: Array<{ destroy(): void }> = []

afterEach(() => {
  for (const controller of mountedControllers.splice(0)) controller.destroy()
  document.body.replaceChildren()
})

const createObserverHarness = () => {
  let callback: (entries: HeadingIntersection[]) => void = () => undefined
  const harness: ObserverHarness = {
    emit(entries) {
      callback(entries)
    },
    disconnectCount: 0,
  }

  return {
    harness,
    createObserver(onEntries: (entries: HeadingIntersection[]) => void) {
      callback = onEntries
      return {
        observe: () => undefined,
        disconnect: () => {
          harness.disconnectCount += 1
        },
      }
    },
  }
}

describe('createHeadingGlitchController', () => {
  test('rearms only after the previous effect restores the source color', async () => {
    const heading = document.createElement('h1')
    heading.dataset.pixiGlitch = ''
    heading.style.setProperty('color', 'rgb(12, 34, 56)', 'important')
    document.body.append(heading)
    const played: Array<{ element: Element; signal: AbortSignal }> = []
    const colorsBeforeRender: string[] = []
    const { harness, createObserver } = createObserverHarness()
    const controller = createHeadingGlitchController({
      document,
      window,
      createObserver,
      shouldReduceMotion: () => false,
      play: (element, signal) => {
        played.push({ element, signal })
        return runWithSourceTextHidden(
          element as HTMLElement,
          () => {
            colorsBeforeRender.push((element as HTMLElement).style.getPropertyValue('color'))
          },
          () =>
            new Promise<void>((resolve) => {
              if (signal.aborted) resolve()
              else signal.addEventListener('abort', () => resolve(), { once: true })
            })
        )
      },
    })
    mountedControllers.push(controller)

    controller.mount()
    expect(played.length).toBe(0)
    harness.emit([{ target: heading, isIntersecting: true }])
    expect(played.length).toBe(1)
    expect(played[0].element).toBe(heading)
    await Promise.resolve()
    expect(heading.style.getPropertyValue('color')).toBe('transparent')

    harness.emit([{ target: heading, isIntersecting: true }])
    window.dispatchEvent(new Event('scroll'))
    expect(played.length).toBe(1)

    harness.emit([{ target: heading, isIntersecting: false }])
    expect(played[0].signal.aborted).toBe(true)
    harness.emit([{ target: heading, isIntersecting: true }])
    expect(played.length).toBe(1)

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(played.length).toBe(2)
    expect(played[1].signal.aborted).toBe(false)
    expect(colorsBeforeRender[1]).toBe('rgb(12, 34, 56)')
    expect(heading.style.getPropertyValue('color')).toBe('transparent')

    controller.destroy()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(heading.style.getPropertyValue('color')).toBe('rgb(12, 34, 56)')
  })

  test('skips playback when reduced motion is active', () => {
    const heading = document.createElement('h2')
    heading.dataset.pixiGlitch = ''
    document.body.append(heading)
    let playCount = 0
    const { harness, createObserver } = createObserverHarness()
    const controller = createHeadingGlitchController({
      document,
      window,
      createObserver,
      shouldReduceMotion: () => true,
      play: () => {
        playCount += 1
      },
    })
    mountedControllers.push(controller)

    controller.mount()
    harness.emit([{ target: heading, isIntersecting: true }])

    expect(playCount).toBe(0)
  })

  test('disconnects observation and cancels an active effect during cleanup', () => {
    const heading = document.createElement('h2')
    heading.dataset.pixiGlitch = ''
    document.body.append(heading)
    let activeSignal: AbortSignal | undefined
    const { harness, createObserver } = createObserverHarness()
    const controller = createHeadingGlitchController({
      document,
      window,
      createObserver,
      shouldReduceMotion: () => false,
      play: (_element, signal) => {
        activeSignal = signal
      },
    })

    controller.mount()
    harness.emit([{ target: heading, isIntersecting: true }])
    controller.destroy()

    expect(harness.disconnectCount).toBe(1)
    expect(activeSignal?.aborted).toBe(true)
  })

  test('resets played state when a route remounts the controller', () => {
    const heading = document.createElement('h1')
    heading.dataset.pixiGlitch = ''
    document.body.append(heading)
    let playCount = 0
    const firstObserver = createObserverHarness()
    const first = createHeadingGlitchController({
      document,
      window,
      createObserver: firstObserver.createObserver,
      shouldReduceMotion: () => false,
      play: () => {
        playCount += 1
      },
    })

    first.mount()
    firstObserver.harness.emit([{ target: heading, isIntersecting: true }])
    expect(playCount).toBe(1)
    first.destroy()

    const secondObserver = createObserverHarness()
    const second = createHeadingGlitchController({
      document,
      window,
      createObserver: secondObserver.createObserver,
      shouldReduceMotion: () => false,
      play: () => {
        playCount += 1
      },
    })
    mountedControllers.push(second)

    second.mount()
    secondObserver.harness.emit([{ target: heading, isIntersecting: true }])
    expect(playCount).toBe(2)
  })

  test('keeps reduced-motion cancellation serialized until source color is restored', async () => {
    const heading = document.createElement('h2')
    heading.dataset.pixiGlitch = ''
    heading.style.color = 'rgb(20, 40, 60)'
    document.body.append(heading)
    const colorsBeforeRender: string[] = []
    let playCount = 0
    let shouldReduce = false
    let notifyMotionChange = () => undefined
    const { harness, createObserver } = createObserverHarness()
    const controller = createHeadingGlitchController({
      document,
      window,
      createObserver,
      shouldReduceMotion: () => shouldReduce,
      subscribeReducedMotion: (onChange) => {
        notifyMotionChange = onChange
        return () => undefined
      },
      play: (element, signal) => {
        playCount += 1
        return runWithSourceTextHidden(
          element as HTMLElement,
          () => colorsBeforeRender.push((element as HTMLElement).style.color),
          () =>
            new Promise<void>((resolve) => {
              if (signal.aborted) resolve()
              else signal.addEventListener('abort', () => resolve(), { once: true })
            })
        )
      },
    })
    mountedControllers.push(controller)

    controller.mount()
    harness.emit([{ target: heading, isIntersecting: true }])
    await Promise.resolve()
    expect(heading.style.color).toBe('transparent')

    shouldReduce = true
    notifyMotionChange()
    shouldReduce = false
    harness.emit([{ target: heading, isIntersecting: false }])
    harness.emit([{ target: heading, isIntersecting: true }])
    expect(playCount).toBe(1)

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(playCount).toBe(2)
    expect(colorsBeforeRender[1]).toBe('rgb(20, 40, 60)')
  })
})

describe('runWithSourceTextHidden', () => {
  test('hides only after the first rendered frame and restores exact inline color on failure', async () => {
    const heading = document.createElement('h1')
    heading.style.setProperty('color', 'rgb(12, 34, 56)', 'important')
    const colors: string[] = []

    await expect(
      runWithSourceTextHidden(
        heading,
        () => {
          colors.push(heading.style.getPropertyValue('color'))
        },
        async () => {
          colors.push(heading.style.getPropertyValue('color'))
          throw new Error('render failed')
        }
      )
    ).rejects.toThrow('render failed')

    expect(colors[0]).toBe('rgb(12, 34, 56)')
    expect(colors[1]).toBe('transparent')
    expect(heading.style.getPropertyValue('color')).toBe('rgb(12, 34, 56)')
    expect(heading.style.getPropertyPriority('color')).toBe('important')
  })
})

describe('syncTextToTarget', () => {
  test('tracks the current viewport position and reports when the heading leaves the viewport', () => {
    const heading = document.createElement('h2')
    const text = { x: 0, y: 0, style: { wordWrapWidth: 0 } }
    heading.getBoundingClientRect = () =>
      ({ left: 24, top: 80, right: 224, bottom: 128, width: 200, height: 48 }) as DOMRect

    expect(syncTextToTarget(heading, text, { width: 1024, height: 768 })).toBe(true)
    expect(text.x).toBe(24)
    expect(text.y).toBe(80)
    expect(text.style.wordWrapWidth).toBe(200)

    heading.getBoundingClientRect = () =>
      ({ left: 24, top: -100, right: 224, bottom: -52, width: 200, height: 48 }) as DOMRect

    expect(syncTextToTarget(heading, text, { width: 1024, height: 768 })).toBe(false)
  })
})
