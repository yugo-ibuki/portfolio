import type { FC } from 'react'

export const Block: FC = ({
 children
}) => {
  return (
    <div className={'mt-10'}>
      {children}
    </div>
  )
}