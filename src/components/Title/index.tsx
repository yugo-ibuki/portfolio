import type { FC } from 'react'
import { ImPushpin } from 'react-icons/im'

export const Title: FC = ({
  children
}) => {
  return (
    <h2 className={'flex items-center text-xl gap-x-3'}>
      <ImPushpin />
      {children}
    </h2>
  )
}