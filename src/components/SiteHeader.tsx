'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ColorModeSwitch } from '@/components/ColorModeSwitch'
import { cn } from '@/lib/utils'
import { isNavigationItemActive, siteNavigation } from './siteNavigation'

export const SiteHeader = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 hidden border-b border-foreground/10 bg-background/90 backdrop-blur-xl lg:block">
      <div className="site-gutter flex h-20 w-full items-center gap-8">
        <Link
          href="/"
          className="mr-auto text-lg font-semibold tracking-[-0.03em] transition-opacity hover:opacity-60"
        >
          Yugo Ibuki
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 lg:gap-7">
            {siteNavigation.map((item) => {
              const isActive = isNavigationItemActive(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground',
                      isActive &&
                        'text-foreground after:absolute after:inset-x-0 after:bottom-1 after:h-px after:bg-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <ColorModeSwitch />
      </div>
    </header>
  )
}
