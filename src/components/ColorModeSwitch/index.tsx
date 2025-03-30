'use client'

import { MdDarkMode, MdLightMode } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '../../components/components/ui/button'

export const ColorModeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-transparent"
    >
      {theme === 'light' ? (
        <MdDarkMode size={30} />
      ) : (
        <MdLightMode size={30} />
      )}
    </Button>
  )
}