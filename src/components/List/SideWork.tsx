import type { FC } from 'react'
import { SideWorkOfficialSiteLink } from '@/components/SideWorkOfficialSiteLink'
import { SideWorkReferences } from '@/components/SideWorkReferences'
import { AppLink as Link } from '@/components/AppLink'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { Separator } from '@/components/components/ui/separator'
import { getSideWorkHref, isInternalSideWork, sideWorks } from '@/content/background'

export const SideWork: FC = () => {
  return (
    <div className="space-y-8">
      {sideWorks.map((sw, index) => {
        const isInternal = isInternalSideWork(sw)
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
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Link
                  href={getSideWorkHref(sw)}
                  target={isInternal ? undefined : '_blank'}
                  rel={isInternal ? undefined : 'noopener noreferrer'}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {sw.title}
                </Link>
                {period && (
                  <p className="text-sm text-muted-foreground">
                    {`${period.startDate} ~ ${period.endDate}`}
                    <span className="ml-2 text-xs">{period.duration}</span>
                  </p>
                )}
                {isInternal && <SideWorkOfficialSiteLink {...sw} />}
              </div>
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
            </div>
            {isInternal && sw.references && <SideWorkReferences references={sw.references} />}
            {index < sideWorks.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
