import type { FC } from 'react'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { experiences } from '@/content/experience'

export const Step: FC = () => {
  return (
    <div className="divide-y divide-border">
      {experiences.map((ex) => {
        const formattedStartDate = formatDate(ex.startDate)
        const formattedEndDate = ex.endDate ? formatDate(ex.endDate) : 'present'
        const duration = calculateDuration(ex.startDate, ex.endDate)

        return (
          <div
            key={ex.title}
            className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-x-8 sm:gap-y-0"
          >
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {`${formattedStartDate} ~ ${formattedEndDate}`}
              </p>
              <p className="text-xs text-muted-foreground">{duration}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{ex.title}</h3>
              <p className="text-muted-foreground">{ex.jobTitle}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
