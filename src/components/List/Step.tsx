import type { FC } from 'react'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { experiences } from '@/content/experience'

export const Step: FC = () => {
  return (
    <div>
      {experiences.map((ex, index) => {
        const formattedStartDate = formatDate(ex.startDate)
        const formattedEndDate = ex.endDate ? formatDate(ex.endDate) : 'present'
        const duration = calculateDuration(ex.startDate, ex.endDate)

        return (
          <div
            key={ex.title}
            className="relative grid grid-cols-[0.5rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:grid-cols-[10rem_0.5rem_minmax(0,1fr)] sm:gap-x-8"
          >
            {index < experiences.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-1 top-3 w-px bg-border sm:left-[12.25rem]"
              />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 col-start-1 row-start-1 mt-2 size-2 rounded-full border border-foreground/30 bg-background sm:col-start-2"
            />
            <div className="col-start-2 row-start-1 space-y-1 sm:col-start-1 sm:text-right">
              <p className="text-sm text-muted-foreground">
                {`${formattedStartDate} ~ ${formattedEndDate}`}
              </p>
              <p className="text-xs text-muted-foreground">{duration}</p>
            </div>
            <div className="col-start-2 row-start-2 mt-2 space-y-1 sm:col-start-3 sm:row-start-1 sm:mt-0">
              <h3 className="text-lg font-medium">{ex.title}</h3>
              <p className="text-muted-foreground">{ex.jobTitle}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
