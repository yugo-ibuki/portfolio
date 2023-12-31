import type { FC } from 'react'
import Link from 'next/link'

const sideWorks: {
  title: string
  term: string | number
  link: string
  isExternal?: boolean
}[] = [
  {
    title: 'English Mentor',
    term: '2018 - 2020',
    link: '/background/english_mentor',
  },
  {
    title: 'Laravel Mentor',
    term: '2021 - present',
    link: '/background/programming_mentor',
  },
  {
    title: 'Self Employee',
    term: '2021 - present',
    link: 'https://coconala.com/users/1842790',
    isExternal: true,
  },
]

export const SideWork: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {sideWorks.map((sw) => {
        return (
          <li key={sw.title}>
            <dl className={'flex flex-col gap-y-[10px]'}>
              <dt className={'underline decoration-sky-300'}>
                <Link href={sw.link} target={sw.isExternal ? '_blank' : ''}>
                  {sw.title}
                </Link>
              </dt>
              <dd className={'ml-[30px]'}>{sw.term}</dd>
            </dl>
          </li>
        )
      })}
    </ul>
  )
}
