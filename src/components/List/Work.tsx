import type { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/components/ui/card'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { works } from '@/content/works'

export const Work: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {works.map((work) => (
        <Card key={work.name} className="overflow-hidden flex flex-col">
          <div className="relative h-48 w-full bg-muted">
            <Image
              src={work.photo}
              alt={work.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{work.name}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{work.description}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {work.github && (
                    <Link
                      href={work.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FaGithub className="h-4 w-4" />
                      Source Code
                    </Link>
                  )}
                  <Link
                    href={work.url}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt className="h-3 w-3" />
                    Live Demo
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
