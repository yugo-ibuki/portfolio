import type { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

export const Block: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('mt-10 space-y-4', className)}>
      {children}
    </div>
  )
}
