import type { FC } from 'react'

const sideWorks: {
  title: string
  description: string
}[] = [
  {
    title: 'English Mentor',
    description: `
      I've worked as an English Mentor.
      Describing the English expression especially for writing, speaking,
      taught how to learn English.
      I also wrote some article about learning English.
      `,
  },
  {
    title: 'Laravel Mentor',
    description: `
      I've worked as a Laravel Mentor.
      Usually, writing PHP, how to setup the local developing environment, using MySQL, Laravel, Docker.
      I also reviewed the DB design, depending on their original app that they plan to build.
      Taught what the concept of Class, Interface, Object Oriented Programming are.
    `,
  }
]

export const SideWork: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {
        sideWorks.map(sw => {
          return (
            <li key={sw.title}>
              <dl className={'flex flex-col gap-y-[10px]'}>
                <dt>{sw.title}</dt>
                <dd className={'ml-[30px]'}>{sw.description}</dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}