import type { FC } from 'react'

const graduates: {
  name: string
  place: string
  major: string
}[] = [
  {
    name: 'Kyoto Sangyo Univ',
    place: 'Kyoto / Japan',
    major: 'English / Communication',
  },
  {
    name: 'Arbutus College',
    place: 'Vancouver / Canada',
    major: 'Interpreting / Translating',
  },
]

export const Graduate: FC = () => {
  return (
    <ul className={'flex flex-col gap-y-[20px]'}>
      {graduates.map((grd) => {
        return (
          <li key={grd.name}>
            <div className={'c-sp-list gap-x-5'}>
              <div className={'w-[150px] sp:w-full font-bold'}>{grd.name}</div>
              <div className={'w-[180px] sp:ml-[10px]'}>{grd.place}</div>
              <div className={'sp:ml-[10px]'}>{grd.major}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
