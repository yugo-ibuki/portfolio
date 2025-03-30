import type { FC } from 'react'
import { Separator } from '@/components/components/ui/separator'

const graduates: {
  name: string
  place: string
  major: string
}[] = [
  {
    name: 'Kyoto Sangyo Univ',
    place: 'Kyoto / Japan',
    major: 'English / Communication',
  },
  {
    name: 'Arbutus College',
    place: 'Vancouver / Canada',
    major: 'Interpreting / Translating',
  },
]

export const Graduate: FC = () => {
  return (
    <div className="space-y-6">
      {graduates.map((grad, index) => (
        <div key={grad.name} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <div className="font-medium min-w-[180px]">{grad.name}</div>
            <div className="text-muted-foreground min-w-[160px]">{grad.place}</div>
            <div className="text-muted-foreground">{grad.major}</div>
          </div>
          {index < graduates.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
