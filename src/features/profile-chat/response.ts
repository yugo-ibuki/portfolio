import profileChatData from '@/content/profile-chat.json'

type ChatTopic = {
  id: string
  keywords: string[]
  buildReply: () => string
}

const joinNatural = (items: string[]) => {
  if (items.length <= 2) {
    return items.join(' and ')
  }

  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`
}

const includesAny = (text: string, keywords: string[]) => {
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()))
}

const buildParagraphs = (paragraphs: string[]) => {
  return paragraphs.join('\n\n')
}

const isGreeting = (question: string) => {
  return (
    /\b(hello|hi|hey)\b/.test(question) ||
    includesAny(question, ['こんにちは', 'はじめまして', 'よろしく'])
  )
}

const buildSkillReply = () => {
  const skills = profileChatData.skills
  const mainSkills = [...skills.languages, ...skills.frameworks.slice(0, 3)]
  const aiTools = skills.aiTools.join(', ')

  return buildParagraphs([
    `${profileChatData.personal.name} mainly works with ${joinNatural(mainSkills)}.`,
    `On the AI side, the profile lists ${aiTools}, which fits his current focus as an ${profileChatData.personal.role}.`,
  ])
}

const buildWorkReply = () => {
  const workNames = profileChatData.works.map((work) => work.name)
  const workSummaries = profileChatData.works
    .map((work) => `${work.name}: ${work.summary}`)
    .join('\n')

  return buildParagraphs([
    `His works include ${joinNatural(workNames)}.`,
    `In short:\n${workSummaries}`,
    'A lot of them are practical, personal-product style projects.',
  ])
}

const buildExperienceReply = () => {
  const current = profileChatData.experience.at(-1)
  const pastRoles = profileChatData.experience
    .slice(0, -1)
    .map((experience) => `${experience.company} as ${experience.role}`)
    .join('\n')

  return buildParagraphs([
    `His experience includes:\n${pastRoles}`,
    `The current profile entry says he works as an ${current?.role} from ${current?.period}.`,
  ])
}

const buildEducationReply = () => {
  const education = profileChatData.education
    .map((entry) => `${entry.school} (${entry.major})`)
    .join('\n')

  return buildParagraphs([
    `His education includes:\n${education}`,
    'He has a background in English, communication, interpreting, and translation.',
  ])
}

const buildSideWorkReply = () => {
  const sideWork = profileChatData.sideWork
    .map((entry) => `${entry.title} at ${entry.place}`)
    .join('\n')

  return buildParagraphs([
    `His side work includes:\n${sideWork}`,
    'The profile shows mentoring experience in both English learning and programming.',
  ])
}

const buildAboutReply = () => {
  return buildParagraphs([
    `${profileChatData.personal.name} is an ${profileChatData.personal.role} based in ${profileChatData.personal.location}.`,
    `${profileChatData.personal.summary} The profile highlights AI application development, web development, and mentoring experience.`,
  ])
}

const buildContactReply = () => {
  return `The profile points visitors to the ${profileChatData.contact.contactPage} page or GitHub: ${profileChatData.contact.github}.`
}

const topics: ChatTopic[] = [
  {
    id: 'skills',
    keywords: [
      'skill',
      'skills',
      'technology',
      'technologies',
      'tech stack',
      'programming',
      'typescript',
      'ai',
      'できる',
      'スキル',
      '技術',
      '言語',
      '得意',
      'ai',
    ],
    buildReply: buildSkillReply,
  },
  {
    id: 'works',
    keywords: [
      'work',
      'works',
      'project',
      'projects',
      'product',
      'portfolio',
      'built',
      'unitmux',
      'cheeyo',
      '作った',
      '作品',
      'プロジェクト',
      '開発した',
      '成果物',
    ],
    buildReply: buildWorkReply,
  },
  {
    id: 'experience',
    keywords: [
      'experience',
      'career',
      'job',
      'company',
      'role',
      '職歴',
      '経歴',
      '仕事',
      '会社',
      'キャリア',
    ],
    buildReply: buildExperienceReply,
  },
  {
    id: 'education',
    keywords: ['education', 'school', 'university', 'college', '学歴', '大学', '学校', '専攻'],
    buildReply: buildEducationReply,
  },
  {
    id: 'sideWork',
    keywords: [
      'mentor',
      'mentoring',
      'side work',
      'freelance',
      'coconala',
      '副業',
      'メンター',
      '講師',
      '教える',
    ],
    buildReply: buildSideWorkReply,
  },
  {
    id: 'contact',
    keywords: ['contact', 'github', 'reach', 'message', '連絡', '問い合わせ', 'github'],
    buildReply: buildContactReply,
  },
  {
    id: 'about',
    keywords: [
      'about',
      'profile',
      'who',
      'summary',
      'yugo',
      'ibuki',
      '自己紹介',
      'プロフィール',
      'どんな人',
      '誰',
    ],
    buildReply: buildAboutReply,
  },
]

export const getSuggestedProfileQuestions = () => [
  'What skills does Yugo have?',
  'Tell me about your works',
  'What is your career background?',
  'Do you have mentoring experience?',
]

export const buildProfileChatReply = (question: string) => {
  const normalizedQuestion = question.trim().toLowerCase()

  if (!normalizedQuestion) {
    return 'Ask me something and I will answer from the profile data.'
  }

  if (isGreeting(normalizedQuestion)) {
    return `Hi. I can answer questions about ${profileChatData.personal.name}'s skills, career, works, and side work from the profile data.`
  }

  const matchedTopic = topics.find((topic) => includesAny(normalizedQuestion, topic.keywords))

  if (matchedTopic) {
    return matchedTopic.buildReply()
  }

  return 'I can only answer from the profile data for now. Try asking about skills, works, experience, education, or mentoring side work.'
}
