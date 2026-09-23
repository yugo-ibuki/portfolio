'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from '@/components/Layout/Drawer'
import { ProfileSidebar } from '@/components/ProfileSidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar'
import { ColorModeSwitch } from '@/components/ColorModeSwitch'

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/90 backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center px-5">
        <div className="mr-auto flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap font-bold text-lg tracking-tight transition-[opacity,transform] duration-200 ease-out hover:opacity-80 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src="/assets/me.jpeg" alt="Yugo Ibuki" />
              <AvatarFallback>YI</AvatarFallback>
            </Avatar>
            Yugo Ibuki
          </Link>
        </div>
        <ColorModeSwitch />
        <Menu disclosure={{ isOpen, onOpen, onClose }}>
          <div className="pt-2">
            <ProfileSidebar className="border-none" onNavClick={onClose} />
          </div>
        </Menu>
      </div>
    </header>
  )
}
