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
              <dl className={'c-sp-list gap-x-5'}>
                <dt className={'w-[150px] sp:w-full font-bold'}>{grd.name}</dt>
                <dd className={'w-[180px] sp:ml-[10px]'}>{grd.place}</dd>
                <dd className={'sp:ml-[10px]'}>{grd.major}</dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}