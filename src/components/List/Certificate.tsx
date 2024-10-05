import type { FC } from 'react'
import { Tag } from '@chakra-ui/react'

type CertificateType = 'english' | 'it' | 'other'

const certificatesEnum: {
  [key in CertificateType]: CertificateType
} = {
  english: 'english',
  it: 'it',
  other: 'other',
}

const certificates: {
  name: string
  type: CertificateType
  lank: string | number
}[] = [
  {
    name: 'TOEIC',
    type: certificatesEnum.english,
    lank: 875,
  },
  {
    name: 'EIKEN (English Test in Japan)',
    type: certificatesEnum.english,
    lank: 'Grade Pre-1',
  },
  {
    name: 'IELTS',
    type: certificatesEnum.english,
    lank: '6.0',
  },
  {
    name: 'Google Cloud Certification',
    type: certificatesEnum.it,
    lank: 'Associate Cloud Engineer',
  },
  {
    name: 'Google Cloud Certification',
    type: certificatesEnum.it,
    lank: 'Professional DevOps Engineer',
  },
]

export const Certificate: FC = () => {
  return (
    <ul className={'mx-auto flex flex-col gap-y-[20px]'}>
      {certificates.map((certificate, index) => {
        return (
          <li key={certificate.name + index}>
            <div className={'flex flex-col gap-y-[10px]'}>
              <div className={'font-bold'}>
                {certificate.name}: <Tag>{certificate.type.toUpperCase()}</Tag>
              </div>
              <div className={'ml-[30px]'}>{certificate.lank}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
