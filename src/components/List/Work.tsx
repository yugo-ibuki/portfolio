import type { FC } from 'react'
import Link from 'next/link'

const works: {
  name: string
  description: string
  url: string
  photo: string
}[] = [
  {
    name: 'Japanese population graph by prefecture',
    description: 'It shows population in Japan by prefecture.',
    url: 'https://population-app.vercel.app/',
    photo: '/assets/population-app.png',
  },
  {
    name: 'Cheeyo',
    description: 'It means "Cheer you up". That is CLI to cheer you up through the terminal.',
    url: 'https://github.com/yugo-ibuki/cheeyo',
    photo: '/assets/cheeyo.png',
  },
  {
    name: "Yui's portfolio",
    description: 'Introduction of the illustrations drawn by Yui.',
    url: 'https://yuinosuke2.com',
    photo: '/assets/yui-san.png',
  },
]

export const Work: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {works.map((w) => {
        return (
          <li key={w.name}>
            <dl className={'flex flex-col gap-y-[10px]'}>
              <dt>
                <Link
                  href={w.url}
                  target="_blank"
                  className={'text-cyan-600 flex flex-col gap-y-3'}
                >
                  {w.name}
                  <img src={w.photo} alt={w.name} />
                </Link>
              </dt>
              <dd className={'ml-[30px]'}>{w.description}</dd>
            </dl>
          </li>
        )
      })}
    </ul>
  )
}
