import type { FC } from 'react'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'

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
    endDate: null,
    jobTitle: 'Product Developer (Frontend Developer / Backend Developer)',
  },
]

export const Step: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {experiences.map((ex) => {
        const formattedStartDate = formatDate(ex.startDate)
        const formattedEndDate = ex.endDate ? formatDate(ex.endDate) : 'present'
        const duration = calculateDuration(ex.startDate, ex.endDate)

        return (
          <li key={ex.title}>
            <dl className={'flex flex-col gap-y-[10px]'}>
              <dt>{ex.title}</dt>
              <dd className={'ml-[30px]'}>{ex.jobTitle}</dd>
              <dd className={'ml-[30px]'}>
                {`${formattedStartDate} ~ ${formattedEndDate}`}
                <span className="ml-2 text-sm text-gray-600">{duration}</span>
              </dd>
            </dl>
          </li>
        )
      })}
    </ul>
  )
}
