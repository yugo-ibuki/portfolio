import type { FC } from 'react'
import Link from 'next/link'

const articles: {
  name: string
  link: string
}[] = [
  {
    name: 'Zenn',
    link: 'https://zenn.dev/nana'
  },
  {
    name: 'Note',
    link: 'https://note.com/eve_key/'
  }
]

export const Articles: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {
        articles.map(article => {
          return (
            <li>
              <dl className={'flex flex-col gap-y-[10px]'}>
                <dt className={'text-cyan-600'}>{article.name}</dt>
                <dd className={'ml-[30px]'}>
                  <Link href={article.link}>
                    <a target='_blank'>{article.link}</a>
                  </Link>
                </dd>
              </dl>
            </li>
          )
        })
      }
    </ul>
  )
}