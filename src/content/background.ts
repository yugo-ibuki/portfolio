export type SideWorkDates =
  | {
      startDate: string
      endDate: string | null
    }
  | {
      startDate?: never
      endDate?: never
    }

export type SideWorkBase = {
  title: string
  summary?: string
  activities?: string[]
} & SideWorkDates

export const sideWorkReferenceCategories = ['AI Consulting', 'Workshop', 'Public Speaking'] as const

export type InternalSideWork = SideWorkBase & {
  slug: string
  place: string
  officialSiteUrl?: string
  description: string[]
  references?: {
    title: string
    japaneseTitle?: string
    url: string
    thumbnail?: string
    category: (typeof sideWorkReferenceCategories)[number]
  }[]
}

export type ExternalSideWork = SideWorkBase & {
  externalUrl: string
}

export type SideWorkEntry = InternalSideWork | ExternalSideWork

export const sideWorks: SideWorkEntry[] = [
  {
    title: 'Tech Commit',
    summary: 'English Mentoring',
    activities: [
      'English mentoring',
      'Writing and speaking guidance',
      'Study advice and English learning articles',
    ],
    slug: 'english_mentor',
    place: 'Tech Commit',
    officialSiteUrl: 'https://corp.tech-training.jp/',
    startDate: '2018-01',
    endDate: '2020-12',
    description: [
      "I've worked as an English Mentor.",
      'I taught English expression with a focus on writing, speaking, and effective study methods.',
      'I also wrote articles about learning English.',
    ],
  },
  {
    title: 'Tech Boost',
    summary: 'Laravel Mentoring',
    activities: [
      'PHP and Laravel mentoring',
      'MySQL and database design reviews',
      'Docker and local development setup',
      'Object-oriented programming guidance',
    ],
    slug: 'programming_mentor',
    place: 'Tech Boost',
    officialSiteUrl: 'https://tech-boost.jp/',
    startDate: '2020-06',
    endDate: '2025-02',
    description: [
      "I've worked as a Laravel Mentor.",
      'I taught PHP, MySQL, Docker, Laravel, and how to set up local development environments.',
      'I also reviewed database designs and explained core concepts such as classes, interfaces, and object-oriented programming.',
    ],
  },
  {
    title: 'TechTrain',
    summary: 'Programming Mentoring, AI Adoption Support & University Workshops',
    activities: ['Programming mentoring', 'Code reviews and feedback'],
    slug: 'programming_mentor_2',
    place: 'TechTrain',
    officialSiteUrl: 'https://service.techtrain.dev/',
    startDate: '2025-03',
    endDate: null,
    description: [
      'I work with TechTrain to support learning and skill development.',
      'I taught React, Go, Laravel, and web development.',
      'I reviewed code, gave feedback, and coached students on how to study programming effectively.',
      'My work also includes AI training, AI adoption support, and workshops for university students.',
      'Through TechTrain, I helped deliver a three-session, five-hour generative AI hands-on training program for Tokyo Total Consulting, supporting AI adoption in day-to-day consulting work.',
      'The program covered identifying opportunities for AI use in existing workflows, prompt design, and hands-on AI agent implementation with tools including ChatGPT, Gemini, and Claude. Participants applied what they learned to their own business challenges and developed plans to expand AI use across their teams.',
      'Through TechTrain, I supported students at Musashino University in an AI-powered problem-solving internship, helping them identify problems, build prototypes with AI, gather user feedback, and improve their products.',
      'The program ran from September 25 to October 23, 2026. All 43 participants completed the program and presented their work in a final poster session; 85% of survey respondents said the experience would help them in their job search.',
      'As a TechTrain mentor, I spoke at the KAMINASHI × TechBowl meetup on May 30, 2025, sharing how I built a real-time chat app using Cloudflare Workers, Durable Objects, and WebSockets.',
      'I also gave a lightning talk at CircLeT 2026 on March 1, sharing how I used AI to build an authorization server. The event brought together four student tech clubs.',
    ],
    references: [
      {
        category: 'AI Consulting',
        title: 'Tokyo Total Consulting: Generative AI hands-on training (TechTrain case study)',
        url: 'https://business.techtrain.dev/training/case/ttc-genai-hands-on-3series',
        thumbnail: '/assets/sidework/techtrain-training.jpg',
      },
      {
        category: 'Workshop',
        title: 'Musashino University: AI-powered problem-solving workshop (PR TIMES)',
        url: 'https://prtimes.jp/main/html/rd/p/000000254.000040741.html',
        thumbnail: '/assets/sidework/techtrain-musashino.jpg',
      },
      {
        category: 'Public Speaking',
        title:
          'KAMINASHI × TechBowl meetup: Building real-time chat with Cloudflare Durable Objects',
        japaneseTitle: 'Cloudflare Durable Objectsについて',
        url: 'https://techtrain.dev/media/articles/hisvafpeq',
        thumbnail: '/assets/sidework/techtrain-kaminashi.jpg',
      },
      {
        category: 'Public Speaking',
        title: 'CircLeT 2026: Behind the scenes of building an authorization server with AI',
        japaneseTitle: '認可サーバ構築の裏話～AIを利用したイマドキアプローチ～',
        url: 'https://news.nicovideo.jp/watch/nw18993291',
        thumbnail: '/assets/sidework/techtrain-circlet.jpg',
      },
    ],
  },
  {
    title: 'Ficilcom',
    summary: 'Frontend Engineering',
    activities: ['Frontend development'],
    slug: 'ficilcom',
    place: 'Ficilcom',
    description: ['I worked as a frontend engineer at Ficilcom.'],
  },
  {
    title: 'Self Employee',
    startDate: '2021-01',
    endDate: null,
    externalUrl: 'https://coconala.com/users/1842790',
  },
]

export const isInternalSideWork = (sideWork: SideWorkEntry): sideWork is InternalSideWork => {
  return 'slug' in sideWork
}

export const getSideWorkHref = (sideWork: SideWorkEntry) => {
  return isInternalSideWork(sideWork) ? `/background/${sideWork.slug}` : sideWork.externalUrl
}

export const getSideWorkBySlug = (slug: string) => {
  return sideWorks.find(
    (sideWork): sideWork is InternalSideWork =>
      isInternalSideWork(sideWork) && sideWork.slug === slug
  )
}

export const internalSideWorks = sideWorks.filter(isInternalSideWork)
