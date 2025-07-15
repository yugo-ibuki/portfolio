import type { FC, ReactNode } from 'react'
import React from 'react'
import '../style/global.css'
import { Header } from '@components'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from './providers'
import type { Metadata } from 'next'
import { Toaster } from '@/components/components/ui/toaster'
import Background3D from '@/components/Background3D'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Yugo Ibuki',
    template: '%s | Acme',
  },
  icons: {
    icon: '/icon.ico',
  },
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Background3D />
          <Header />
          <div className={'max-w-[700px] sp:max-w-[100%] mx-auto px-5 mb-[60px] relative z-10'}>
            {children}
            <Analytics />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
