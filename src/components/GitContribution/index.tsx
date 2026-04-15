'use client'
import type { Contribution } from '@hooks/useGitContribution'
import { useGitContribution } from '@hooks/useGitContribution'
import { useCalendar } from '@hooks/useCalendar'
import type { FC } from 'react'
import { getColor } from '@lib/getColor'
import { Spinner } from '@components/components/ui/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/components/ui/tooltip'

export const GitContribution = () => {
  const { isLoading, error, contributions } = useGitContribution()
  const { totalWeeks, calendarData } = useCalendar({ contributions })

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
        <div className="flex justify-around">
          {Array.from({ length: totalWeeks }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const contribution = calendarData[`${weekIndex}-${dayIndex}`]
                return contribution ? (
                  <Contribution key={`${weekIndex}-${dayIndex}`} contribution={contribution} />
                ) : (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="w-[14px] h-[14px] m-[1px] bg-gray-300 rounded-sm"
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

const Contribution: FC<{ contribution: Contribution }> = ({ contribution }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="w-[14px] h-[14px] m-[1px] rounded-sm hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-gray-400 transition-[transform,box-shadow,outline-color] duration-200 ease-out hover:-translate-y-px hover:shadow-[0_8px_18px_-14px_rgba(15,23,42,0.8)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
