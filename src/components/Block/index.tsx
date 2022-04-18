import { FC } from 'react'

// type TBlock = {
//
// }

export const Block: FC = ({
 children
}) => {
  return (
    <div className={'mt-5'}>
      {children}
    </div>
  )
}