'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@components/components/ui/sheet'
import { GiHamburgerMenu } from 'react-icons/gi'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
}

export const Menu: FC<Props> = ({ children, disclosure }) => {
  const { isOpen, onOpen, onClose } = disclosure
  return (
    <div>
      <button
        onClick={onOpen}
        className="cursor-pointer bg-background p-2 rounded flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="メニューを開く"
      >
        <GiHamburgerMenu size={24} className="text-foreground block" />
      </button>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">
              サイト内のページを選択できます。
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
