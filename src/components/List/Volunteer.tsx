import type { FC } from 'react'
import Link from 'next/link'
import { Separator } from '@/components/components/ui/separator'
import { volunteerActivities } from '@/content/volunteer'

export const Volunteer: FC = () => {
  return (
    <div className="space-y-8">
      {volunteerActivities.map((activity, index) => (
        <div key={activity.title} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{activity.title}</h3>
            <div className="pl-4 space-y-4">
              <p className="text-muted-foreground">{activity.content}</p>
              {activity.link && (
                <Link
                  href={activity.link.href}
                  target="_blank"
                  className="inline-block text-primary hover:text-primary/80 transition-colors"
                >
                  {activity.link.label}
                  {activity.link.subLabel && (
                    <>
                      <br />
                      <span className="text-sm">{activity.link.subLabel}</span>
                    </>
                  )}
                </Link>
              )}
            </div>
          </div>
          {index < volunteerActivities.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
