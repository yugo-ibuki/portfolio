export type TSkill = {
  name: string
  terms: number
  level: number | string
}

export type TSkills = {
  language: TSkill[]
  framework: TSkill[]
  cloud: TSkill[]
  others: TSkill[]
}

export const skills: TSkills = {
  language: [
    {
      name: 'JavaScript',
      terms: 3,
      level: 70,
    },
    {
      name: 'TypeScript',
      terms: 2,
      level: 60,
    },
    {
      name: 'PHP',
      terms: 4,
      level: 60,
    },
    {
      name: 'Go',
      terms: 0.2,
      level: 'Learning...',
    }
  ],
  framework: [
    {
      name: 'Next.js',
      terms: 2,
      level: 60,
    },
    {
      name: 'Vue.js',
      terms: 0.8,
      level: 30,
    },
    {
      name: 'Laravel',
      terms: 2,
      level: 55,
    },
    {
      name: 'Nest.js',
      terms: 0.5,
      level: 20,
    },
  ],
  cloud: [
    {
      name: 'AWS',
      terms: 1.5,
      level: 30,
    },
    {
      name: 'GCP',
      terms: 0.8,
      level: 20,
    },
  ],
  others: [
    {
      name: 'React.js',
      terms: 2,
      level: 65,
    },
    {
      name: 'GraphQL',
      terms: 0.5,
      level: 30,
    },
    {
      name: 'Firebase',
      terms: 1,
      level: 45,
    },
    {
      name: 'Docker',
      terms: 2,
      level: 30,
    },
  ]
}