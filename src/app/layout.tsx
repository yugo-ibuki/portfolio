import type { FC, ReactNode } from 'react'
import React from 'react'
import '../style/global.css'
import { ProfileSidebar } from '@/components/ProfileSidebar'
import { MobileHeader } from '@/components/MobileHeader'
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Background3D />
          {/* <Header /> */}
          <MobileHeader />
          <div className="max-w-7xl mx-auto px-6 py-6 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

              {/* Left Sidebar (Desktop Only) */}
              <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24">
                <ProfileSidebar />
              </div>

              {/* Main Content Area */}
              <main className="lg:col-span-9 min-h-[50vh]">
                {children}
                <div className="pt-20">
                  <Analytics />
                </div>
              </main>

            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
