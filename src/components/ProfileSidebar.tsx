'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillGithub } from 'react-icons/ai'
import { HiMapPin } from 'react-icons/hi2'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar'
import { cn } from '@/lib/utils'
import { isNavigationItemActive, siteNavigation } from './siteNavigation'

export const ProfileSidebar = ({
  className,
  onNavClick,
}: {
  className?: string
  onNavClick?: () => void
}) => {
  const pathname = usePathname()

  return (
    <aside className={cn('flex min-h-[calc(100vh-7rem)] flex-col gap-10', className)}>
      <div className="flex flex-col gap-4">
        <Avatar className="h-20 w-20 border border-border/50">
          <AvatarImage src="/assets/me.jpeg" alt="Yugo Ibuki" />
          <AvatarFallback className="text-4xl text-muted-foreground">YI</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <Link
            href="/"
            className="block transition-[opacity,transform] duration-200 ease-out hover:opacity-80 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            onClick={onNavClick}
          >
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-primary break-words">
              Yugo Ibuki
            </h2>
          </Link>
          <p className="text-lg text-muted-foreground font-medium">AI Application Engineer</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <HiMapPin className="w-4 h-4" />
            <span>Japan</span>
          </p>
        </div>

        <p className="leading-relaxed text-muted-foreground text-sm">
          Hello, I&apos;m Yugo. A web developer based in Japan, passionate about building AI-driven
          applications.
        </p>
      </div>

      <nav className="flex flex-col border-t border-foreground/15" aria-label="Mobile navigation">
        {siteNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavClick}
            aria-current={isNavigationItemActive(pathname, item.href) ? 'page' : undefined}
            className={cn(
              'flex items-center justify-between border-b border-foreground/15 py-4 text-xl font-semibold tracking-[-0.02em] transition-colors',
              isNavigationItemActive(pathname, item.href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            {item.name}
            <span aria-hidden="true" className="text-sm font-normal">
              {isNavigationItemActive(pathname, item.href) ? '●' : '↗'}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex gap-4 items-center mt-auto">
        <Link
          href="https://github.com/yugo-ibuki"
          className="p-2 -ml-2 rounded-full text-foreground/80 hover:bg-muted hover:text-primary transition-[color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <AiFillGithub size={24} />
        </Link>
        {/* <Link
          href="https://www.linkedin.com/in/yugo-ibuki-7353b7138/"
          className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-primary"
          target="_blank"
           aria-label="LinkedIn"
        >
          <AiFillLinkedin size={24} />
        </Link> */}
      </div>
    </aside>
  )
}
