import type { ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import { MobileHeader } from './MobileHeader'
import { SiteHeader } from './SiteHeader'
import { Providers } from './Providers'
import { Toaster } from './components/ui/toaster'
import { PixiHeadingGlitch } from './PixiHeadingGlitch'
import PageTransition from './PageTransition'

const EMAIL_ADDRESS = 'y.ibuki91@gmail.com'

export const AppShell = ({ children }: { children: ReactNode }) => {
  const pathname = useLocation({ select: (location) => location.pathname })

  return (
    <Providers>
      <SiteHeader />
      <MobileHeader />
      <main className="site-content site-shell min-h-[70vh] overflow-x-clip">
        <PageTransition key={pathname}>{children}</PageTransition>
      </main>
      <footer className="border-t border-foreground/10">
        <div className="site-content site-gutter flex w-full flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Yugo Ibuki — AI Application Engineer</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="w-fit break-all underline decoration-border underline-offset-4 hover:text-foreground"
            >
              {EMAIL_ADDRESS}
            </a>
            <a
              href="https://github.com/yugo-ibuki"
              target="_blank"
              rel="noreferrer"
              className="w-fit underline decoration-border underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
      <PixiHeadingGlitch />
      <Toaster />
    </Providers>
  )
}
