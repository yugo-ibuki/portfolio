import { FC } from 'react'
import { ImPushpin } from 'react-icons/im'

export const Title: FC = ({
  children
}) => {
  return (
    <h2 className={'flex items-center text-xl'}>
      <ImPushpin />
      {children}
    </h2>
  )
}