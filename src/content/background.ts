export type SideWorkDates =
  | {
      startDate: string
      endDate: string | null
    }
  | {
      startDate?: never
      endDate?: never
    }

export type SideWorkBase = {
  title: string
  summary?: string
  activities?: string[]
} & SideWorkDates

export type InternalSideWork = SideWorkBase & {
  slug: string
  place: string
  description: string[]
}

export type ExternalSideWork = SideWorkBase & {
  externalUrl: string
}

export type SideWorkEntry = InternalSideWork | ExternalSideWork

export const sideWorks: SideWorkEntry[] = [
  {
    title: 'Tech Commit',
    summary: 'English Mentoring',
    activities: [
      'English mentoring',
      'Writing and speaking guidance',
      'Study advice and English learning articles',
    ],
    slug: 'english_mentor',
    place: 'Tech Commit',
    startDate: '2018-01',
    endDate: '2020-12',
    description: [
      "I've worked as an English Mentor.",
      'I taught English expression with a focus on writing, speaking, and effective study methods.',
      'I also wrote articles about learning English.',
    ],
  },
  {
    title: 'Tech Boost',
    summary: 'Laravel Mentoring',
    activities: [
      'PHP and Laravel mentoring',
      'MySQL and database design reviews',
      'Docker and local development setup',
      'Object-oriented programming guidance',
    ],
    slug: 'programming_mentor',
    place: 'Tech Boost',
    startDate: '2020-06',
    endDate: '2025-02',
    description: [
      "I've worked as a Laravel Mentor.",
      'I taught PHP, MySQL, Docker, Laravel, and how to set up local development environments.',
      'I also reviewed database designs and explained core concepts such as classes, interfaces, and object-oriented programming.',
    ],
  },
  {
    title: 'Tech Train',
    summary: 'Programming Mentoring, AI Training & University Workshops',
    activities: [
      'Programming mentoring',
      'Code reviews and feedback',
      'AI training',
      'Workshops for university students',
      'Public speaking',
    ],
    slug: 'programming_mentor_2',
    place: 'Tech Train',
    startDate: '2025-03',
    endDate: null,
    description: [
      'I work with Tech Train to support learning and skill development.',
      'I taught React, Go, Laravel, and web development.',
      'I reviewed code, gave feedback, and coached students on how to study programming effectively.',
      'My work also includes AI training and workshops for university students.',
    ],
  },
  {
    title: 'Ficilcom',
    summary: 'Frontend Engineering',
    activities: ['Frontend development'],
    slug: 'ficilcom',
    place: 'Ficilcom',
    description: ['I worked as a frontend engineer at Ficilcom.'],
  },
  {
    title: 'Self Employee',
    startDate: '2021-01',
    endDate: null,
    externalUrl: 'https://coconala.com/users/1842790',
  },
]

export const isInternalSideWork = (sideWork: SideWorkEntry): sideWork is InternalSideWork => {
  return 'slug' in sideWork
}

export const getSideWorkHref = (sideWork: SideWorkEntry) => {
  return isInternalSideWork(sideWork) ? `/background/${sideWork.slug}` : sideWork.externalUrl
}

export const getSideWorkBySlug = (slug: string) => {
  return sideWorks.find(
    (sideWork): sideWork is InternalSideWork =>
      isInternalSideWork(sideWork) && sideWork.slug === slug
  )
}

export const internalSideWorks = sideWorks.filter(isInternalSideWork)
