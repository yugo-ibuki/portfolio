import type { FC } from 'react'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

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
  },
  {
    name: 'Qiita',
    link: 'https://qiita.com/yugo-ibuki'
  },
  {
    name: 'Reading Book Blog',
    link: 'https://ugo-ev.hatenablog.com/'
  },
]

export const Articles: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {
        articles.map(article => {
          return (
            <li key={article.name}>
              <dl className={'flex flex-col gap-y-[10px]'}>
                <dt className={'text-cyan-600'}>{article.name}</dt>
                <dd className={'ml-[30px]'}>
                  <Link href={article.link}>
                    <a target='_blank' className={'flex justify-start items-center gap-x-3'}>{article.link} <FaExternalLinkAlt /></a>
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