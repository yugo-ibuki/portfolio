"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillGithub } from 'react-icons/ai'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar'
import { cn } from '@/lib/utils'
import { ColorModeSwitch } from '@components/ColorModeSwitch'

const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'BACKGROUND', href: '/background' },
    { name: 'WORKS', href: '/works' },
    { name: 'ARTICLES', href: '/articles' },
    { name: 'CONTACT', href: '/contact' },
]

export const ProfileSidebar = ({ className, onNavClick }: { className?: string, onNavClick?: () => void }) => {
    const pathname = usePathname()

    return (
        <aside className={cn("flex flex-col gap-8", className)}>
            <div className="flex flex-col gap-4">
                <Avatar className="w-32 h-32 md:w-32 md:h-32 border-2 border-border/50">
                    <AvatarImage src="/assets/me.jpeg" alt="Yugo Ibuki" />
                    <AvatarFallback className="text-4xl text-muted-foreground">YI</AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                    <Link href="/" className="hover:opacity-80 transition-opacity block" onClick={onNavClick}>
                        <h1 className="text-3xl font-bold tracking-tight text-primary break-words">
                            YUGO IBUKI
                        </h1>
                    </Link>
                    <p className="text-lg text-muted-foreground font-medium">
                        AI Application Engineer
                    </p>
                </div>

                <p className="leading-relaxed text-muted-foreground text-sm">
                    Hello, I'm Yugo. A web developer based in Japan, passionate about building AI-driven applications.
                </p>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavClick}
                        className={cn(
                            "text-sm font-bold tracking-wider hover:text-primary transition-colors py-1 uppercase",
                            pathname === item.href
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="flex gap-4 items-center mt-auto">
                <Link
                    href="https://github.com/yugo-ibuki"
                    className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-primary"
                    target="_blank"
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
                <div className="ml-auto">
                    <ColorModeSwitch />
                </div>
            </div>
        </aside>
    )
}
