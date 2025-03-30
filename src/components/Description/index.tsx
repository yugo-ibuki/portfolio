import type { FC, ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '@/components/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  subtitle: string
  className?: string
}

export const Description: FC<Props> = ({ children, subtitle, className }) => {
  return (
    <Card className={cn('mt-5', className)}>
      <CardHeader className="border-b-2 border-gray-200 dark:border-gray-700 py-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">at:</span>
          <h2 className="font-semibold text-lg">{subtitle}</h2>
        </div>
      </CardHeader>
      <CardContent className="pt-5 text-lg">
        {children}
      </CardContent>
    </Card>
  )
}
