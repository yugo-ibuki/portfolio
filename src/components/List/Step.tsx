import type { FC } from 'react'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'
import { Separator } from '@/components/components/ui/separator'

type Experience = {
  title: string
  startDate: string
  endDate: string | null
  jobTitle: string
}

const experiences: Experience[] = [
  {
    title: 'Crafts inc',
    startDate: '2017-01',
    endDate: '2017-07',
    jobTitle: 'Interpreter / Translator',
  },
  {
    title: 'ALIVE inc',
    startDate: '2017-12',
    endDate: '2019-03',
    jobTitle: 'Web Creator',
  },
  {
    title: 'Maple Systems',
    startDate: '2019-04',
    endDate: '2019-12',
    jobTitle: 'System Engineer',
  },
  {
    title: 'Asia Quest',
    startDate: '2020-01',
    endDate: '2021-10',
    jobTitle: 'Backend Developer',
  },
  {
    title: '■ ■ ■ ■ ■',
    startDate: '2021-11',
    endDate: '2025-07',
    jobTitle: 'Product Developer (Frontend Developer / Backend Developer)',
  },
  {
    title: '■ ■ ■ ■ ■ (New)',
    startDate: '2025-09',
    endDate: null,
    jobTitle: 'Product Developer (Frontend Developer / Backend Developer / Mobile Developer)',
  },
]

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

