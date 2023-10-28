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
  ide: TSkill[]
  environment: TSkill[]
}

export const skills: TSkills = {
  language: [
    {
      name: 'JavaScript',
      terms: 4,
      level: 70,
    },
    {
      name: 'TypeScript',
      terms: 4,
      level: 70,
    },
    {
      name: 'PHP',
      terms: 4,
      level: 60,
    },
    {
      name: 'Go',
      terms: 1.5,
      level: 40,
    },
  ],
  framework: [
    {
      name: 'Next.js',
      terms: 3,
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
      level: 25,
    },
    {
      name: 'GCP',
      terms: 2.5,
      level: 45,
    },
  ],
  others: [
    {
      name: 'GraphQL',
      terms: 1.5,
      level: 45,
    },
    {
      name: 'Firebase',
      terms: 1.5,
      level: 50,
    },
    {
      name: 'Docker',
      terms: 4,
      level: 60,
    },
    {
      name: 'GitHub Actions',
      terms: 2.5,
      level: 60,
    },
  ],
  ide: [
    {
      name: 'JetBrains',
      terms: 4,
      level: 60,
    },
    {
      name: 'Vim',
      terms: 2,
      level: 40,
    },
  ],
  environment: [
    {
      name: 'macOS',
      terms: 5,
      level: 50,
    },
    {
      name: 'tmux',
      terms: 2,
      level: 50,
    },
    {
      name: 'fish',
      terms: 2,
      level: 50,
    },
  ],
}
