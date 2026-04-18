import type { FC } from 'react'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Card, CardContent } from '@/components/components/ui/card'
import { articles } from '@/content/articles'

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
              <p className="text-sm text-muted-foreground">{article.description}</p>
              <div className="text-xs text-muted-foreground mt-2 truncate">{article.link}</div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
