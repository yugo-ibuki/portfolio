'use client'

import { useEffect, useRef, useState, type FC } from 'react'
import { skills } from '@/content/skills'
import type { SkillEntry, SkillGroupKey } from '@/content/skills'
import { formatSkillTerm } from '@/lib/formatSkillTerm'
import { getTerminalFrame, type TerminalFrame } from '@/lib/terminalTimeline'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const COMMAND = 'ls --skill'
const groupKeys = Object.keys(skills) as SkillGroupKey[]
// グループ名1つとスキル1つを、それぞれ1項目として順番に表示する
const itemCount = groupKeys.reduce((count, key) => count + 1 + skills[key].length, 0)

const initialFrame: TerminalFrame = {
  typedChars: 0,
  visibleItems: 0,
  retypedChars: 0,
  isDone: false,
}
const finalFrame: TerminalFrame = {
  typedChars: COMMAND.length,
  visibleItems: itemCount,
  retypedChars: COMMAND.length,
  isDone: true,
}

const useTerminalPlayback = (isInView: boolean) => {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [frame, setFrame] = useState(initialFrame)
  const [replayCount, setReplayCount] = useState(0)
  // 自動再生は画面に入ったときだけ（動きを減らす設定では行わない）。再実行は常に再生する
  const shouldPlay = replayCount > 0 || (isInView && !shouldReduceMotion)

  useEffect(() => {
    if (!shouldPlay) {
      return
    }

    let frameId = 0
    const startedAt = performance.now()

    const tick = (now: number) => {
      const next = getTerminalFrame(now - startedAt, COMMAND.length, itemCount)

      setFrame((current) =>
        current.typedChars === next.typedChars &&
        current.visibleItems === next.visibleItems &&
        current.retypedChars === next.retypedChars &&
        current.isDone === next.isDone
          ? current
          : next
      )

      if (!next.isDone) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [shouldPlay, replayCount])

  const replay = () => {
    setFrame(initialFrame)
    setReplayCount((count) => count + 1)
  }

  const isShowingFinalFrame = shouldReduceMotion && replayCount === 0

  return { frame: isShowingFinalFrame ? finalFrame : frame, isAnimated: shouldPlay, replay }
}

export const Skill: FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const rerunRef = useRef<HTMLButtonElement>(null)
  const isInView = useInViewOnce(terminalRef)
  const {
    frame: { typedChars, visibleItems, retypedChars, isDone },
    isAnimated,
    replay,
  } = useTerminalPlayback(isInView)
  const isTyping = visibleItems === 0
  const isOutputComplete = visibleItems === itemCount

  // 再生が終わったら、再入力したコマンドにフォーカスして Enter で再実行できるようにする。
  // 他の場所を操作中の人の邪魔をしないよう、フォーカスがどこにもないときだけ当てる
  useEffect(() => {
    if (!isDone || !isAnimated) {
      return
    }

    const activeElement = document.activeElement

    if (activeElement === document.body || terminalRef.current?.contains(activeElement)) {
      rerunRef.current?.focus({ preventScroll: true })
    }
  }, [isDone, isAnimated])
  let itemIndex = 0

  return (
    <div
      ref={terminalRef}
      role="region"
      aria-label="Technical skills"
      className="overflow-hidden rounded-xl border border-foreground/15 bg-background font-mono text-sm"
    >
      <noscript
        dangerouslySetInnerHTML={{ __html: '<style>[data-visible]{opacity:1!important}</style>' }}
      />
      <div
        className="flex items-center gap-2 border-b border-foreground/10 px-4 py-3"
        aria-hidden="true"
      >
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="h-3 w-3 rounded-full bg-foreground/15" />
        <span className="ml-3 text-xs text-muted-foreground">yugo@portfolio: ~</span>
      </div>

      <div className="space-y-4 p-5">
        <p aria-hidden="true">
          <Prompt />
          {COMMAND.slice(0, typedChars)}
          {isTyping && <Cursor />}
        </p>

        <div className="space-y-4">
          {groupKeys.map((key) => {
            const groupIndex = itemIndex++

            return (
              <section key={key}>
                <OutputItem isVisible={groupIndex < visibleItems} className="font-semibold">
                  {key}/
                </OutputItem>
                <ul className="mt-2 grid gap-x-6 gap-y-1 pl-4 sm:grid-cols-2 lg:grid-cols-3">
                  {skills[key].map((skill: SkillEntry) => {
                    const skillIndex = itemIndex++

                    return (
                      <OutputItem
                        key={skill.name}
                        as="li"
                        isVisible={skillIndex < visibleItems}
                        className="flex items-baseline gap-3"
                      >
                        <span className="w-[15ch] shrink-0 truncate">{skill.name}</span>
                        <span className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
                          {formatSkillTerm(skill.terms)}
                        </span>
                      </OutputItem>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>

        <p
          className={cn(
            'transition-opacity duration-150',
            isOutputComplete ? 'opacity-100' : 'opacity-0'
          )}
        >
          <button
            ref={rerunRef}
            type="button"
            onClick={replay}
            disabled={!isDone}
            aria-label="Run ls --skill again"
            className="-mx-2 rounded-md px-2 py-0.5 text-left outline-none transition-colors enabled:cursor-pointer enabled:hover:bg-foreground/5 focus:bg-foreground/5"
          >
            <Prompt />
            {COMMAND.slice(0, retypedChars)}
            {isOutputComplete && <Cursor />}
            <span
              className={cn(
                'ml-3 text-xs text-muted-foreground transition-opacity',
                isDone ? 'opacity-100' : 'opacity-0'
              )}
            >
              ↵ Enter
            </span>
          </button>
        </p>
      </div>
    </div>
  )
}

const Prompt: FC = () => <span className="mr-2 text-muted-foreground">~ $</span>

const Cursor: FC = () => (
  <span className="terminal-cursor ml-0.5 inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] bg-foreground" />
)

const OutputItem: FC<{
  as?: 'p' | 'li'
  isVisible: boolean
  className?: string
  children: React.ReactNode
}> = ({ as: Component = 'p', isVisible, className, children }) => (
  <Component
    data-visible={String(isVisible)}
    className={cn(
      'transition-opacity duration-150',
      isVisible ? 'opacity-100' : 'opacity-0',
      className
    )}
  >
    {children}
  </Component>
)
