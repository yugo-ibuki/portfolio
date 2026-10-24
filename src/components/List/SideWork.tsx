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
        const period = sw.startDate
          ? {
              startDate: formatDate(sw.startDate),
              endDate: sw.endDate ? formatDate(sw.endDate) : 'present',
              duration: calculateDuration(sw.startDate, sw.endDate ?? null),
            }
          : null
        const activities = sw.activities ?? []
        const hasActivities = activities.length > 0

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
              {!hasActivities && sw.summary && (
                <p className="text-sm text-muted-foreground">{sw.summary}</p>
              )}
              {hasActivities && (
                <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/80">
                  {activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              )}
              {period && (
                <div className="pl-4">
                  <p className="text-sm text-muted-foreground">
                    {`${period.startDate} ~ ${period.endDate}`}
                    <span className="ml-2 text-xs">{period.duration}</span>
                  </p>
                </div>
              )}
            </div>
            {index < sideWorks.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
