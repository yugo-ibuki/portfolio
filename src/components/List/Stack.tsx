import type { FC } from 'react'
import Link from 'next/link'

const stacks: {
  name: string
  url: string
}[] = [
  {
    name: 'Next.js',
    url: 'https://nextjs.org/',
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
  },
  {
    name: 'Chakra',
    url: 'https://chakra-ui.com/'
  }
]

export const Stack: FC = () => {
  return (
    <ul className={'flex flex-col gap-y-[20px]'}>
      {
        stacks.map(stack => {
          return (
            <li>
              <Link href={stack.url}>
                <a target={'_blank'}>
                  {stack.name}
                </a>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}