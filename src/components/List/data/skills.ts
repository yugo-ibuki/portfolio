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
      terms: 3,
      level: 70,
    },
    {
      name: 'TypeScript',
      terms: 2.5,
      level: 60,
    },
    {
      name: 'PHP',
      terms: 4,
      level: 60,
    },
    {
      name: 'Go',
      terms: 0.8,
      level: 30,
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
      level: 25,
    },
    {
      name: 'GCP',
      terms: 1.5,
      level: 40,
    },
  ],
  others: [
    {
      name: 'GraphQL',
      terms: 0.5,
      level: 40,
    },
    {
      name: 'Firebase',
      terms: 1,
      level: 45,
    },
    {
      name: 'Docker',
      terms: 3,
      level: 50,
    },
    {
      name: 'GitHub Actions',
      terms: 1.5,
      level: 50,
    },
  ],
  ide: [
    {
      name: 'JetBrains',
      terms: 3,
      level: 60,
    },
    {
      name: 'Vim',
      terms: 1.5,
      level: 30,
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
    }
  ],
}