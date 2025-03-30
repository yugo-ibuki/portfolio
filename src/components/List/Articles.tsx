import type { FC } from 'react'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Card, CardContent } from '@/components/components/ui/card'

const articles: {
  name: string
  link: string
  description: string
}[] = [
  {
    name: 'Zenn',
    link: 'https://zenn.dev/nana',
    description: 'Technical articles about modern web development, React, and TypeScript'
  },
  {
    name: 'Note',
    link: 'https://note.com/eve_key/',
    description: 'Essays and thoughts about software development and career growth'
  },
  {
    name: 'Qiita',
    link: 'https://qiita.com/yugo-ibuki',
    description: 'Deep dives into programming concepts and best practices'
  },
  {
    name: 'Reading Book Blog',
    link: 'https://ugo-ev.hatenablog.com/',
    description: 'Book reviews and insights from technical and non-technical readings'
  },
  {
    name: 'Novel',
    link: 'https://sizu.me/ugo',
    description: 'Creative writing and storytelling experiments'
  },
]

export const Articles: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article) => (
        <Card key={article.name} className="group hover:shadow-md transition-shadow">
          <Link href={article.link} target="_blank">
            <CardContent className="p-6">
              <div className="flex items-center gap-x-2 mb-2">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {article.name}
                </h3>
                <FaExternalLinkAlt className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                {article.description}
              </p>
              <div className="text-xs text-muted-foreground mt-2 truncate">
                {article.link}
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
