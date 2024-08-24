import type { FC } from 'react'
import Link from 'next/link'

const volunteers: {
  title: string
  content: string
}[] = [
  {
    title: 'Movie Translate',
    content: "I volunteered to translate films in my university's.",
  },
]

export const Volunteer: FC = () => {
  return (
    <ul className={'w-[90%] mx-auto flex flex-col gap-y-[20px]'}>
      {volunteers.map((v) => {
        return (
          <li key={v.title}>
            <div className={'flex flex-col gap-y-[10px]'}>
              <div>{v.title}</div>
              <div className={'ml-[30px]'}>{v.content}</div>
              <div className={'ml-[30px]'}>
                <Link
                  href="https://www.kisfvf.com/"
                  target={'_blank'}
                  className={'text-cyan-600 hover:cursor-pointer'}
                >
                  Kyoto International Student Film & Video Festival
                  <br />
                  (京都国際学生映画祭)
                </Link>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
