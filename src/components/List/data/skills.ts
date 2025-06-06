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
  team: TSkill[]
}

export const skills: TSkills = {
  language: [
    {
      name: 'JavaScript',
      terms: 5.5,
      level: 70,
    },
    {
      name: 'TypeScript',
      terms: 6,
      level: 75,
    },
    {
      name: 'PHP',
      terms: 4,
      level: 60,
    },
    {
      name: 'Go',
      terms: 2,
      level: 50,
    },
  ],
  framework: [
    {
      name: 'Next.js',
      terms: 4.5,
      level: 65,
    },
    {
      name: 'Laravel',
      terms: 2,
      level: 55,
    },
    {
      name: 'Remix',
      terms: 1,
      level: 45,
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
      terms: 4,
      level: 60,
    },
  ],
  others: [
    {
      name: 'GraphQL',
      terms: 2,
      level: 50,
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
    {
      name: 'Cursor',
      terms: 1,
      level: 30,
    },
  ],
  team: [
    {
      name: 'Agile',
      terms: 2.5,
      level: 40,
    },
    {
      name: 'Scrum',
      terms: 2.5,
      level: 45,
    },
  ],
}
