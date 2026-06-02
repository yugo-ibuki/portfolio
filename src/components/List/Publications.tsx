import type { FC } from 'react'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Badge } from '@/components/components/ui/badge'
import { Card, CardContent } from '@/components/components/ui/card'
import { publications } from '@/content/publications'

export const Publications: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {publications.map((publication) => (
        <Card key={publication.name} className="group hover:shadow-md transition-shadow">
          <Link href={publication.link} target="_blank">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center gap-x-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {publication.name}
                  </h3>
                  <FaExternalLinkAlt className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{publication.contribution}</Badge>
                  <span className="text-xs text-muted-foreground">{publication.publishedAt}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{publication.description}</p>
              <div className="text-xs text-muted-foreground mt-2 truncate">{publication.link}</div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
