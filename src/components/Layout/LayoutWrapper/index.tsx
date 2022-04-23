import React from 'react'

type Props = {
  children: React.ReactNode
}

export const LayoutWrapper: React.VFC<Props> = ({ children }) => {
  return (
    <div className={'max-w-[100%] mx-auto px-5 mb-[60px] md:max-w-[700px]'}>
      { children }
    </div>
  )
}