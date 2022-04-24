import type { FC } from 'react'
import React from 'react'
import Link from 'next/link'

export type NavData = {
  name: string
  href: string
}

type HeaderListProps = {
  navData: NavData[]
  ua: string,
  onClose: () => void
}

export const HeaderList: FC<HeaderListProps> = ({
  navData,
  ua,
  onClose
}) => {
  const onClick = () => {
    if (ua === 'iOS' || ua === 'Android') {
      onClose()
    }
  }
  return (
    <>
      {
        navData.map(nav => {
          return (
            <li key={nav.name} className={'hover:border-b-2 hover:border-red-600 border-b-2 border-white-600'} onClick={onClick}>
              <Link href={nav.href}>
                <a target={nav.name === 'GITHUB' ? '_blanck' : '_self'} className={'w-full block'}>
                  {nav.name}
                </a>
              </Link>
            </li>
          )
        })
      }
    </>
  )
}
