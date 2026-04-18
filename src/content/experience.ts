export type ExperienceEntry = {
  title: string
  startDate: string
  endDate: string | null
  jobTitle: string
}

export const experiences: ExperienceEntry[] = [
  {
    title: 'Crafts inc',
    startDate: '2017-01',
    endDate: '2017-07',
    jobTitle: 'Interpreter / Translator',
  },
  {
    title: 'ALIVE inc',
    startDate: '2017-12',
    endDate: '2019-03',
    jobTitle: 'Web Creator',
  },
  {
    title: 'Maple Systems',
    startDate: '2019-04',
    endDate: '2019-12',
    jobTitle: 'System Engineer',
  },
  {
    title: 'Asia Quest',
    startDate: '2020-01',
    endDate: '2021-10',
    jobTitle: 'Backend Developer',
  },
  {
    title: '3-shake',
    startDate: '2021-11',
    endDate: '2025-07',
    jobTitle: 'Product Developer (Frontend Developer / Backend Developer)',
  },
  {
    title: '■ ■ ■ ■ ■ (New)',
    startDate: '2025-09',
    endDate: null,
    jobTitle: 'AI Application Engineer',
  },
]
