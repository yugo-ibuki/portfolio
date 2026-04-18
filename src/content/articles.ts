export type ArticleEntry = {
  name: string
  link: string
  description: string
}

export const articles: ArticleEntry[] = [
  {
    name: 'Zenn',
    link: 'https://zenn.dev/nana',
    description: 'Technical articles about modern web development, React, and TypeScript',
  },
  {
    name: 'Note',
    link: 'https://note.com/eve_key/',
    description: 'Essays and thoughts about software development and career growth',
  },
  {
    name: 'Qiita',
    link: 'https://qiita.com/yugo-ibuki',
    description: 'Deep dives into programming concepts and best practices',
  },
  {
    name: 'Reading Book Blog',
    link: 'https://ugo-ev.hatenablog.com/',
    description: 'Book reviews and insights from technical and non-technical readings',
  },
  {
    name: 'Novel',
    link: 'https://sizu.me/ugo',
    description: 'Creative writing and storytelling experiments',
  },
]
