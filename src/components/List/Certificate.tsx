import type { FC } from 'react'
import Link from 'next/link'

const certificates: {
  name: string
  lank: string | number
}[] = [
  {
    name: 'TOEIC',
    lank: 875
  },
  {
    name: 'EIKEM (English Test in Japan)',
    lank: 'Grade Pre-1'
  },
  {
    name: 'IELTS',
    lank: '6.0'
  }
]

export const Certificate: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {
        certificates.map(certificate => {
          return (
            <li key={certificate.name}>
              <dl className={'flex flex-col gap-y-[10px]'}>
                <dt className={'font-bold'}>{certificate.name}</dt>
                <dd className={'ml-[30px]'}>
                  {certificate.lank}
                </dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}