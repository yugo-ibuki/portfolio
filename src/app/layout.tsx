'use client'

import type { FC, ReactNode } from 'react'
import React from 'react'
import '../style/global.css'
import { Header } from '@components'
import { Analytics } from '@vercel/analytics/react'

type Props = {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Yugo Ibuki</title>
      </head>
      <body>
        <div className={'max-w-[700px] sp:max-w-[100%] mx-auto px-5 mb-[60px]'}>
          <Header />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  )
}

export default RootLayout
