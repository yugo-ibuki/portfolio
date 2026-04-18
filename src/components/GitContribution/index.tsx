'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Spinner } from '@components/components/ui/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/components/ui/tooltip'
import { useCalendar } from '@hooks/useCalendar'
import type { Contribution as GitHubContribution } from '@hooks/useGitContribution'
import { useGitContribution } from '@hooks/useGitContribution'
import { getColor } from '@lib/getColor'

const CONTRIBUTION_ANIMATION_DURATION_MS = 3000
const CONTRIBUTION_ANIMATION_DURATION = `${CONTRIBUTION_ANIMATION_DURATION_MS}ms`
const CONTRIBUTION_ANIMATION_DURATION_CSS_VAR = '--contribution-animation-duration'
const CONTRIBUTION_CELL_CLASS_NAME = 'contribution-cell'
const ANIMATION_STATE_IDLE = 'idle'
const ANIMATION_STATE_RUNNING = 'running'
const CONTRIBUTION_DIRECTIONS = ['up', 'down', 'left', 'right'] as const

type ContributionDirection = (typeof CONTRIBUTION_DIRECTIONS)[number]
type AnimationState = typeof ANIMATION_STATE_IDLE | typeof ANIMATION_STATE_RUNNING
type ContributionGridStyle = CSSProperties &
  Record<typeof CONTRIBUTION_ANIMATION_DURATION_CSS_VAR, string>

const getContributionDirection = (weekIndex: number, dayIndex: number): ContributionDirection =>
  CONTRIBUTION_DIRECTIONS[(weekIndex + dayIndex) % CONTRIBUTION_DIRECTIONS.length]

const getCellAnimationAttributes = (
  weekIndex: number,
  dayIndex: number,
  animationState: AnimationState
) => ({
  'data-direction': getContributionDirection(weekIndex, dayIndex),
  'data-animate': animationState,
})

const contributionGridStyle: ContributionGridStyle = {
  [CONTRIBUTION_ANIMATION_DURATION_CSS_VAR]: CONTRIBUTION_ANIMATION_DURATION,
}

export const GitContribution = () => {
  const { isLoading, error, contributions } = useGitContribution()
  const { totalWeeks, calendarData } = useCalendar({ contributions })
  const [gridElement, setGridElement] = useState<HTMLDivElement | null>(null)
  const [animationState, setAnimationState] = useState<AnimationState>(ANIMATION_STATE_IDLE)

  useEffect(() => {
    if (!gridElement) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimationState(ANIMATION_STATE_RUNNING)
        return
      }

      setAnimationState((current) => {
        if (current === ANIMATION_STATE_IDLE) {
          return current
        }

        return ANIMATION_STATE_IDLE
      })
    })

    observer.observe(gridElement)

    return () => {
      observer.disconnect()
    }
  }, [gridElement])

  if (error) {
    return <p className="text-red-500">エラーになりました。</p>
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="overflow-x-auto">
        <div ref={setGridElement} style={contributionGridStyle} className="flex justify-around">
          {Array.from({ length: totalWeeks }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const contribution = calendarData[`${weekIndex}-${dayIndex}`]
                return contribution ? (
                  <ContributionCell
                    key={`${weekIndex}-${dayIndex}`}
                    contribution={contribution}
                    weekIndex={weekIndex}
                    dayIndex={dayIndex}
                    animationState={animationState}
                  />
                ) : (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    {...getCellAnimationAttributes(weekIndex, dayIndex, animationState)}
                    className={`${CONTRIBUTION_CELL_CLASS_NAME} w-[14px] h-[14px] m-[1px] rounded-sm bg-gray-300`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

const ContributionCell = ({
  contribution,
  weekIndex,
  dayIndex,
  animationState,
}: {
  contribution: GitHubContribution
  weekIndex: number
  dayIndex: number
  animationState: AnimationState
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          {...getCellAnimationAttributes(weekIndex, dayIndex, animationState)}
          className={`${CONTRIBUTION_CELL_CLASS_NAME} w-[14px] h-[14px] m-[1px] rounded-sm hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-gray-400 transition-[transform,box-shadow,outline-color] duration-200 ease-out hover:-translate-y-px hover:shadow-[0_8px_18px_-14px_rgba(15,23,42,0.8)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
          style={{ backgroundColor: getColor(contribution.count) }}
          aria-label={`${contribution.count} contributions on ${contribution.date}`}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {contribution.count} contributions on {contribution.date}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
