export type WorkEntry = {
  name: string
  description: string
  url: string
  photo: string
  github?: string
}

export const works: WorkEntry[] = [
  {
    name: 'UnitMux',
    description: 'Easy coding agent switcher with vim-like operation.',
    url: 'https://github.com/yugo-ibuki/unitmux',
    photo: '/assets/unitmux.png',
    github: 'https://github.com/yugo-ibuki/unitmux',
  },
  {
    name: 'Yoyaku',
    description:
      'A searchable collection of article summaries, filterable by genre and technology.',
    url: 'https://summary-articles.y-ibuki91.workers.dev/',
    photo: '/assets/yoyaku.png',
  },
]
