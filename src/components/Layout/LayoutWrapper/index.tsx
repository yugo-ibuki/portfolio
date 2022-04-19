import React from 'react'

type Props = {
  children: React.ReactNode
}

export const LayoutWrapper: React.VFC<Props> = ({ children }) => {
  return (
    <div className={'max-w-[700px] mx-auto px-5'}>
      { children }
    </div>
  )
}