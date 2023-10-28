import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Block: FC<Props> = ({ children }) => {
  return <div className={'mt-10'}>{children}</div>
}
