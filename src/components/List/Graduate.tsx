import type { FC } from 'react'

const graduates: {
  name: string
  place: string
  major: string
}[] = [
  {
    name: 'Kyoto Sangyo Univ',
    place: 'Kyoto / Japan',
    major: 'English / Communication'
  },
  {
    name: 'Arbutus College',
    place: 'Vancouver / Canada',
    major: 'Interpreting / Translating'
  }
]

export const Graduate: FC = () => {
  return (
    <ul className={'flex flex-col gap-y-[20px]'}>
      {
        graduates.map(grd => {
          return (
            <li>
              <dl className={'flex gap-x-5 items-center'}>
                <dt className={'w-[140px]'}>{grd.name}</dt>
                <dd className={'w-[180px]'}>{grd.place}</dd>
                <dd>{grd.major}</dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}