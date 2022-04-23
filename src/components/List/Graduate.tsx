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
            <li key={grd.name}>
              <dl className={'c-md-list gap-x-5'}>
                <dt className={'w-[140px]'}>{grd.name}</dt>
                <dd className={'w-[180px] ml-[10px] md:ml-[0px]'}>{grd.place}</dd>
                <dd className={'ml-[10px] md:ml-[0px]'}>{grd.major}</dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}