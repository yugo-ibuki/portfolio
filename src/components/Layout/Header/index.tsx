import React from 'react'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { ImWink, ImWink2 } from 'react-icons/im'
import Link from 'next/link'
import { useColorMode, useDisclosure } from '@chakra-ui/react'
import { Menu } from '@components/Layout/Drawer'
import { HeaderList } from './HeaderList'
import type { NavData } from './HeaderList'

const navData: NavData[] = [
  {
    name: 'BACKGROUND',
    href: '/background'
  },
  {
    name: 'ARTICLES',
    href: '/articles'
  },
  // {
  //   name: 'GITHUB',
  //   href: 'https://github.com/yugo-ibuki'
  // },
  {
    name: 'WORKS',
    href: '/works'
  },
  {
    name: 'CONTACT',
    href: '/contact'
  },
]

export const Header: React.FC = () => {
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <header>
      <div className={'px-[10px]'}>
        <div className={'w-[700px] sp:w-full py-[15px] c-flex mx-auto'}>
          <div className={'c-flex gap-x-3 w-full'}>
            <Link href="/" className={'c-flex gap-x-3'}>
              {
                colorMode === 'light'
                  ? <ImWink />
                  : <ImWink2 />
              }
              <h1 className={'font-bold text-lg mr-2'}>Yugo Ibuki</h1>
            </Link>
            <ul className={'c-appearance-flex justify-between items-center gap-x-3'}>
              <HeaderList navData={navData} onClose={onClose} />
            </ul>
            <div className={'c-appearance-block ml-auto'}>
              <ColorModeSwitch />
            </div>
          </div>
          <div className={'c-not-appearance-block'}>
            <Menu disclosure={{isOpen, onOpen, onClose}}>
              <ul className={'flex justify-start flex-col gap-y-3 h-full'}>
                <HeaderList navData={navData} onClose={onClose} />
                <li className={'mt-auto'}>
                  <ColorModeSwitch />
                </li>
              </ul>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}
