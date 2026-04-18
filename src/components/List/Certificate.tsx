import type { FC } from 'react'
import { Separator } from '@/components/components/ui/separator'
import { Badge } from '@/components/components/ui/badge'
import { certificates } from '@/content/certificates'

export const Certificate: FC = () => {
  return (
    <div className="space-y-6">
      {certificates.map((certificate, index) => (
        <div key={certificate.name + index} className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{certificate.name}</span>
              <Badge variant="outline" className="uppercase">
                {certificate.category}
              </Badge>
            </div>
            <div className="text-muted-foreground pl-4">{certificate.value}</div>
          </div>
          {index < certificates.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
