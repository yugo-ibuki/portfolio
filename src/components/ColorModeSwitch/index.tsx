import { MdDarkMode, MdLightMode } from 'react-icons/md'
import React from 'react'
import { useColorMode } from '@chakra-ui/react'

export const ColorModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return colorMode === 'light'
    ? <MdDarkMode size={30} onClick={toggleColorMode} />
    : <MdLightMode size={30} onClick={toggleColorMode} />
}