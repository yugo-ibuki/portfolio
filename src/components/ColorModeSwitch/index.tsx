'use client'

import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from 'next-themes'
import { Button } from '@/components/components/ui/button'
import { cn } from '@/lib/utils'

export function ColorModeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(
        'hover:bg-transparent transition-colors duration-200',
        'focus-visible:ring-1 focus-visible:ring-offset-1'
      )}
    >
      {theme === 'light' ? (
        <MdDarkMode className="h-6 w-6 transition-transform duration-200 rotate-0 dark:-rotate-90" />
      ) : (
        <MdLightMode className="h-6 w-6 transition-transform duration-200 rotate-90 dark:rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}