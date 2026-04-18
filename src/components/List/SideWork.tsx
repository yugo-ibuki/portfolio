import type { FC } from 'react'
import Link from 'next/link'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { Separator } from '@/components/components/ui/separator'
import { getSideWorkHref, isInternalSideWork, sideWorks } from '@/content/background'

export const SideWork: FC = () => {
  return (
    <div className="space-y-8">
      {sideWorks.map((sw, index) => {
        const formattedStartDate = formatDate(sw.startDate)
        const formattedEndDate = sw.endDate ? formatDate(sw.endDate) : 'present'
        const duration = calculateDuration(sw.startDate, sw.endDate)

        return (
          <div key={getSideWorkHref(sw)} className="space-y-4">
            <div className="space-y-2">
              <Link
                href={getSideWorkHref(sw)}
                target={isInternalSideWork(sw) ? undefined : '_blank'}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {sw.title}
              </Link>
              <div className="pl-4">
                <p className="text-sm text-muted-foreground">
                  {`${formattedStartDate} ~ ${formattedEndDate}`}
                  <span className="ml-2 text-xs">{duration}</span>
                </p>
              </div>
            </div>
            {index < sideWorks.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
