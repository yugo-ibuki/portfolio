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
  },
  {
    name: 'React Hook Form',
    url: 'https://react-hook-form.com/'
  },
  {
    name: 'send grid',
    url: 'https://sendgrid.com/'
  }
]

export const Stack: FC = () => {
  return (
    <ul className={'flex flex-col gap-y-[20px]'}>
      {
        stacks.map(stack => {
          return (
            <li key={stack.name}>
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