import type { FC, ReactNode } from 'react'
import React from 'react'
import '../style/global.css'
import { MobileHeader } from '@/components/MobileHeader'
import { SiteHeader } from '@/components/SiteHeader'
import { Providers } from './providers'
import type { Metadata } from 'next'
import { Toaster } from '@/components/components/ui/toaster'
import Link from 'next/link'
import { Instrument_Serif, Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-manrope',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  variable: '--font-instrument-serif',
})

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Yugo Ibuki',
    template: '%s | Yugo Ibuki',
  },
  icons: {
    icon: '/icon.ico',
  },
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${instrumentSerif.variable}`}>
        <Providers>
          <SiteHeader />
          <MobileHeader />
          <main className="site-shell min-h-[70vh] w-full overflow-x-clip">{children}</main>
          <footer className="border-t border-foreground/10">
            <div className="site-content site-gutter flex w-full flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>Yugo Ibuki — AI Application Engineer</p>
              <Link
                href="https://github.com/yugo-ibuki"
                target="_blank"
                rel="noreferrer"
                className="w-fit underline decoration-border underline-offset-4 hover:text-foreground"
              >
                GitHub
              </Link>
            </div>
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
