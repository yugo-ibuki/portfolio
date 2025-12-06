"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu } from '@/components/Layout/Drawer'
import { ProfileSidebar } from '@/components/ProfileSidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar'
import { ImWink } from 'react-icons/im'

export const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)

    return (
        <header className="lg:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6">
                <Menu disclosure={{ isOpen, onOpen, onClose }}>
                    <div className="pt-4">
                        <ProfileSidebar className="border-none" onNavClick={onClose} />
                    </div>
                </Menu>

                <div className="ml-4 flex items-center gap-2">
                    <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/assets/me.jpeg" alt="Yugo Ibuki" />
                            <AvatarFallback>YI</AvatarFallback>
                        </Avatar>
                        YUGO IBUKI
                    </Link>
                </div>
            </div>
        </header>
    )
}
