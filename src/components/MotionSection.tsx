import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { getRevealDelay, SECTION_TRANSITION_DURATION_MS } from '@/lib/motion'

type MotionSectionProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  delayIndex?: number
}

export const MotionSection = ({
  as: Component = 'section',
  children,
  className,
  delayIndex = 0,
}: MotionSectionProps) => {
  const style = {
    '--motion-delay': `${getRevealDelay(delayIndex)}ms`,
    '--motion-section-duration': `${SECTION_TRANSITION_DURATION_MS}ms`,
  } as CSSProperties

  return (
    <Component className={cn('motion-section-reveal', className)} style={style}>
      {children}
    </Component>
  )
}
