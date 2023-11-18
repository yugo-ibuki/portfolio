import { useParams } from 'next/navigation'

type SideWorkDetail = {
  title: string
  place: string
  description: string
}

type SideWorkData = {
  [key: string]: SideWorkDetail
}

const sideWork: SideWorkData = {
  english_mentor: {
    title: 'English Mentor',
    place: 'Tech Commit',
    description: `
      I've worked as an English Mentor.
      <br />
      I taught the English expression especially for writing, speaking, how to learn English.
      <br />I also wrote some article about learning English.
    `,
  },
  programming_mentor: {
    title: 'Programming Mentor',
    place: 'Tech Boost',
    description: `
      I've worked as a Laravel Mentor. Usually, writing PHP, how to setup the local developing environment, using MySQL, Laravel, Docker.<br />
      I also reviewed the DB design, depending on their original app that they plan to build. Taught what the concept of Class, Interface, Object Oriented Programming are.
    `,
  },
}

export const useSideWorkPage = () => {
  const query = useParams()
  const data = sideWork[query.name as string]

  return {
    data,
    isPageExists: !!data,
  }
}
