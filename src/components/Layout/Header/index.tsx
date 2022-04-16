import React from 'react'
import { ColorModeSwitch } from '@components/ColorModeSwitch'
import { ImWink, ImWink2 } from 'react-icons/all'
import Link from 'next/link'
import { useColorMode } from '@chakra-ui/react'

const navData: {
  name: string
  href: string
}[] = [
  {
    name: 'BACKGRLUND',
    href: '/background'
  },
  {
    name: 'WORKS',
    href: 'works'
  },
  {
    name: 'GITHUB',
    href: 'https://github.com/yugo-ibuki'
  }
]

export const Header: React.FC = () => {
  const { colorMode } = useColorMode()
  return (
    <header>
      <div className={'py-[15px]'}>
        <div className={'w-[900px] c-flex mx-auto'}>
          <div className={'c-flex gap-x-3'}>
            {
              colorMode === 'light'
              ? <ImWink />
              : <ImWink2 />
            }
            <h1 className={'font-bold text-lg mr-2'}>Yugo Ibuki</h1>
            <ul className={'c-flex gap-x-3'}>
              {
                navData.map(nav => {
                  return (
                    <li className={'hover:border-b-2 hover:border-red-600 border-b-2 border-white-600'}>
                      <Link href={nav.href}>
                        <a>{nav.name}</a>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <ColorModeSwitch />
        </div>
      </div>
    </header>
  )
}
