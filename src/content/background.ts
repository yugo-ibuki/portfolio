export type SideWorkBase = {
  title: string
  startDate: string
  endDate: string | null
}

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
    title: 'English Mentor',
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
    title: 'Laravel Mentor',
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
    title: 'Programming Mentor',
    slug: 'programming_mentor_2',
    place: 'Tech Train',
    startDate: '2025-03',
    endDate: null,
    description: [
      "I've worked as a mentor for engineering.",
      'I taught React, Go, Laravel, and web development.',
      'I reviewed code, gave feedback, and coached students on how to study programming effectively.',
    ],
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
