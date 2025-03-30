import type { FC, ReactNode } from 'react'
import { ImPushpin } from 'react-icons/im'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

export const Title: FC<Props> = ({ children, className }) => {
  return (
    <h2 className={cn(
      'flex items-center text-xl gap-x-3 font-semibold tracking-tight',
      className
    )}>
      <ImPushpin className="h-5 w-5" />
      {children}
    </h2>
  )
}
