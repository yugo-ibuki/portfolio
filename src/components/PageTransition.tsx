import type { CSSProperties, ReactNode } from 'react'
import { PAGE_TRANSITION_DURATION_MS } from '@/lib/motion'

type Props = {
  children: ReactNode
}

const Template = ({ children }: Props) => {
  return (
    <div
      className="motion-page-enter"
      style={{ '--motion-page-duration': `${PAGE_TRANSITION_DURATION_MS}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export default Template
