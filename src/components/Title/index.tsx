import type { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

export const Title: FC<Props> = ({ children, className }) => {
  return (
    <h1 className={cn('text-3xl font-bold mb-4', className)}>
      {children}
    </h1>
  )
}
