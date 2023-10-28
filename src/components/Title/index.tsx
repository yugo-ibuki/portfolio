import type { FC, ReactNode } from 'react'
import { ImPushpin } from 'react-icons/im'

type Props = {
  children: ReactNode
}

export const Title: FC<Props> = ({ children }) => {
  return (
    <h2 className={'flex items-center text-xl gap-x-3'}>
      <ImPushpin />
      {children}
    </h2>
  )
}
