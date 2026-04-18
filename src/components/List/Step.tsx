import type { FC } from 'react'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { Separator } from '@/components/components/ui/separator'
import { experiences } from '@/content/experience'

export const Step: FC = () => {
  return (
    <div className="space-y-8">
      {experiences.map((ex, index) => {
        const formattedStartDate = formatDate(ex.startDate)
        const formattedEndDate = ex.endDate ? formatDate(ex.endDate) : 'present'
        const duration = calculateDuration(ex.startDate, ex.endDate)

        return (
          <div key={ex.title} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{ex.title}</h3>
              <div className="pl-4 space-y-1">
                <p className="text-muted-foreground">{ex.jobTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {`${formattedStartDate} ~ ${formattedEndDate}`}
                  <span className="ml-2 text-xs">{duration}</span>
                </p>
              </div>
            </div>
            {index < experiences.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
