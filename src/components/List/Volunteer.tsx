import type { FC } from 'react'
import Link from 'next/link'
import { Separator } from '@/components/components/ui/separator'

const volunteers: {
  title: string
  content: string
}[] = [
  {
    title: 'Movie Translate',
    content: "I volunteered to translate films in my university's.",
  },
]

export const Volunteer: FC = () => {
  return (
    <div className="space-y-8">
      {volunteers.map((v, index) => (
        <div key={v.title} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{v.title}</h3>
            <div className="pl-4 space-y-4">
              <p className="text-muted-foreground">{v.content}</p>
              <Link
                href="https://www.kisfvf.com/"
                target="_blank"
                className="inline-block text-primary hover:text-primary/80 transition-colors"
              >
                Kyoto International Student Film & Video Festival
                <br />
                <span className="text-sm">(京都国際学生映画祭)</span>
              </Link>
            </div>
          </div>
          {index < volunteers.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
