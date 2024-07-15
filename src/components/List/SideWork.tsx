import type { FC } from 'react'
import Link from 'next/link'
import { formatDate } from '@lib/formatDate'
import { calculateDuration } from '@lib/calculateDuration'

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
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {sideWorks.map((sw) => {
        const formattedStartDate = formatDate(sw.startDate)
        const formattedEndDate = sw.endDate ? formatDate(sw.endDate) : 'present'
        const duration = calculateDuration(sw.startDate, sw.endDate)

        return (
          <li key={sw.title}>
            <dl className={'flex flex-col gap-y-[10px]'}>
              <dt className={'underline decoration-sky-300'}>
                <Link href={sw.link} target={sw.isExternal ? '_blank' : ''}>
                  {sw.title}
                </Link>
              </dt>
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
