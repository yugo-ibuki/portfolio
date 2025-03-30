import type { FC } from 'react'
import Link from 'next/link'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { Separator } from '@/components/components/ui/separator'

type SideWork = {
  title: string
  startDate: string
  endDate: string | null
  link: string
  isExternal?: boolean
}

const sideWorks: SideWork[] = [
  {
    title: 'English Mentor',
    startDate: '2018-01',
    endDate: '2020-12',
    link: '/background/english_mentor',
  },
  {
    title: 'Laravel Mentor',
    startDate: '2020-06',
    endDate: '2022-12',
    link: '/background/programming_mentor',
  },
  {
    title: 'Self Employee',
    startDate: '2021-01',
    endDate: null,
    link: 'https://coconala.com/users/1842790',
    isExternal: true,
  },
]

export const SideWork: FC = () => {
  return (
    <div className="space-y-8">
      {sideWorks.map((sw, index) => {
        const formattedStartDate = formatDate(sw.startDate)
        const formattedEndDate = sw.endDate ? formatDate(sw.endDate) : 'present'
        const duration = calculateDuration(sw.startDate, sw.endDate)

        return (
          <div key={sw.title} className="space-y-4">
            <div className="space-y-2">
              <Link
                href={sw.link}
                target={sw.isExternal ? '_blank' : undefined}
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

