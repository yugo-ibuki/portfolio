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
  programming_mentor_2: {
    title: 'Programming Mentor',
    place: 'Tech Train',
    description: `
      I've worked as a Mentor for Engineering.
      <br />
      I taught React, Go, Laravel, and Web Development.
      I also reviewed the code, and gave them feedback.
      Also, I taught them how to study programming, what should they do to improve their skills.
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
