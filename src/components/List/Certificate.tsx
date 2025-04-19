import type { FC } from 'react'
import { Separator } from '@/components/components/ui/separator'
import { Badge } from '@/components/components/ui/badge'

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
  {
    name: 'Google Cloud Certification',
    type: certificatesEnum.it,
    lank: 'Professional Security Engineer',
  },
  {
    name: 'Google Cloud Certification',
    type: certificatesEnum.it,
    lank: 'Professional Cloud Architect',
  },
  {
    name: 'Google Cloud Certification',
    type: certificatesEnum.it,
    lank: 'Professional Cloud Developer',
  },
]

export const Certificate: FC = () => {
  return (
    <div className="space-y-6">
      {certificates.map((certificate, index) => (
        <div key={certificate.name + index} className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{certificate.name}</span>
              <Badge variant="outline" className="uppercase">
                {certificate.type}
              </Badge>
            </div>
            <div className="text-muted-foreground pl-4">{certificate.lank}</div>
          </div>
          {index < certificates.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
