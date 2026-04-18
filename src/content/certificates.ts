export type CertificateCategory = 'english' | 'it' | 'other'

export type CertificateEntry = {
  name: string
  category: CertificateCategory
  value: string | number
}

export const certificates: CertificateEntry[] = [
  {
    name: 'TOEIC',
    category: 'english',
    value: 875,
  },
  {
    name: 'EIKEN (English Test in Japan)',
    category: 'english',
    value: 'Grade Pre-1',
  },
  {
    name: 'IELTS',
    category: 'english',
    value: '6.0',
  },
  {
    name: 'Google Cloud Certification',
    category: 'it',
    value: 'Associate Cloud Engineer',
  },
  {
    name: 'Google Cloud Certification',
    category: 'it',
    value: 'Professional DevOps Engineer',
  },
  {
    name: 'Google Cloud Certification',
    category: 'it',
    value: 'Professional Security Engineer',
  },
  {
    name: 'Google Cloud Certification',
    category: 'it',
    value: 'Professional Cloud Architect',
  },
  {
    name: 'Google Cloud Certification',
    category: 'it',
    value: 'Professional Cloud Developer',
  },
]
