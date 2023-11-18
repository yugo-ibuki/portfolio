import type { FC } from 'react'
import Link from 'next/link'

const sideWorks: {
  title: string
  term: string | number
  link: string
}[] = [
  {
    title: 'English Mentor',
    term: '2018 - 2020',
    link: '/background/01',
  },
  {
    title: 'Laravel Mentor',
    term: '2021 - 2023',
    link: '/background/02',
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
                <Link href={sw.link}>{sw.title}</Link>
              </dt>
              <dd className={'ml-[30px]'}>{sw.term}</dd>
            </dl>
          </li>
        )
      })}
    </ul>
  )
}
