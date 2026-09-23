'use client'

import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from 'next-themes'
import { Button } from '@/components/components/ui/button'
import { cn } from '@/lib/utils'

export function ColorModeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'hover:bg-transparent transition-colors duration-200',
        'focus-visible:ring-1 focus-visible:ring-offset-1'
      )}
    >
      <MdDarkMode className="h-6 w-6 transition-transform duration-200 dark:hidden" />
      <MdLightMode className="hidden h-6 w-6 transition-transform duration-200 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
