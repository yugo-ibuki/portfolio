import type { FC } from 'react'

const skills: {
  name: string
  terms: number
  level: number | string
}[] = [
  {
    name: 'JavaScript',
    terms: 3,
    level: 70,
  },
  {
    name: 'TypeScript',
    terms: 2,
    level: 60,
  },
  {
    name: 'Next.js',
    terms: 2,
    level: 60,
  },
  {
    name: 'React.js',
    terms: 2,
    level: 65,
  },
  {
    name: 'Nest.js',
    terms: 0.5,
    level: 20,
  },
  {
    name: 'GraphQL',
    terms: 0.5,
    level: 30,
  },
  {
    name: 'Firebase',
    terms: 1,
    level: 45,
  },
  {
    name: 'Laravel',
    terms: 2,
    level: 55,
  },
  {
    name: 'PHP',
    terms: 4,
    level: 60,
  },
  {
    name: 'Docker',
    terms: 2,
    level: 30,
  },
  {
    name: 'Go',
    terms: 0.2,
    level: 'Learning...',
  }
]

export const Skill: FC = () => {
  return (
    <ul className={'flex flex-col gap-y-[20px]'}>
      {
        skills.map(skill => {
          return (
            <li  key={skill.name}>
              <dl className={'c-sp-list gap-x-5'}>
                <dt className={'w-[100px]'}>{skill.name}</dt>
                <dd className={'w-[70px]'}>{skill.terms} years</dd>
                <dd>
                  <div className={'border w-[300px] h-[17px] relative'}>
                    <span className={'absolute text-white top-[-5px]'}>confidence</span>
                    <div
                      className={'bg-slate-400 h-[17px]'}
                      style={{ width: typeof skill.level === 'number' ? `${skill.level}%` : '0px' }}
                    />
                  </div>
                </dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}