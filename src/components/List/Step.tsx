import type { FC } from 'react'

const experiences: {
  title: string
  terms: string
  jobTitle: string
}[] = [
  {
    title: 'Crafts inc',
    terms: '2017.1 ~ 2017.7',
    jobTitle: 'Interpreter / Translator',
  },
  {
    title: 'ALIVE inc',
    terms: '2017.12 ~ 2019.3',
    jobTitle: 'Web Creator',
  },
  {
    title: 'Maple Systems',
    terms: '2019.4 ~ 2019.12',
    jobTitle: 'System Engineer',
  },
  {
    title: 'Asia Quest',
    terms: '2020.1 ~ 2021.10',
    jobTitle: 'Backend Engineer',
  },
  {
    title: '■ ■ ■ ■ ■',
    terms: '2021.11 ~ present',
    jobTitle: 'Frontend Engineer',
  },
]

export const Step: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {
        experiences.map(ex => {
          return (
            <li key={ex.title}>
              <dl className={'flex flex-col gap-y-[10px]'}>
                <dt>{ex.title}</dt>
                <dd className={'ml-[30px]'}>{ex.jobTitle}</dd>
                <dd className={'ml-[30px]'}>{ex.terms}</dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}