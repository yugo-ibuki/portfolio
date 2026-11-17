import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { AppShell } from '@/components/AppShell'
import NotFound from '@/components/NotFound'
import styles from '@/style/global.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: "Yugo's Site" },
    ],
    links: [
      { rel: 'stylesheet', href: styles },
      { rel: 'icon', href: '/icon.ico' },
    ],
  }),
  shellComponent: RootDocument,
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
