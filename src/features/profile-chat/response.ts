import profileChatData from '@/content/profile-chat.json'

type ChatTopic = {
  id: string
  keywords: string[]
  buildReply: (isJapaneseQuestion: boolean) => string
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

const getLanguageMode = (question: string) => {
  return /[ぁ-んァ-ン一-龯]/.test(question)
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

const buildSkillReply = (isJapaneseQuestion: boolean) => {
  const skills = profileChatData.skills
  const mainSkills = [...skills.languages, ...skills.frameworks.slice(0, 3)]
  const aiTools = skills.aiTools.join(', ')

  if (isJapaneseQuestion) {
    return buildParagraphs([
      `プロフィール上では、${profileChatData.personal.name} は ${joinNatural(mainSkills)} を中心に扱っています。`,
      `AIまわりでは ${aiTools} を使っていて、${profileChatData.personal.role} としてAIアプリケーション開発に軸があります。`,
    ])
  }

  return buildParagraphs([
    `${profileChatData.personal.name} mainly works with ${joinNatural(mainSkills)}.`,
    `On the AI side, the profile lists ${aiTools}, which fits his current focus as an ${profileChatData.personal.role}.`,
  ])
}

const buildWorkReply = (isJapaneseQuestion: boolean) => {
  const workNames = profileChatData.works.map((work) => work.name)
  const workSummaries = profileChatData.works
    .map((work) => `${work.name}: ${work.summary}`)
    .join('\n')

  if (isJapaneseQuestion) {
    return buildParagraphs([
      `作ったものだと ${joinNatural(workNames)} があります。`,
      `ざっくり言うと、${workSummaries}`,
      '個人開発寄りの小さく使えるプロダクトが多いです。',
    ])
  }

  return buildParagraphs([
    `His works include ${joinNatural(workNames)}.`,
    `In short:\n${workSummaries}`,
    'A lot of them are practical, personal-product style projects.',
  ])
}

const buildExperienceReply = (isJapaneseQuestion: boolean) => {
  const current = profileChatData.experience.at(-1)
  const pastRoles = profileChatData.experience
    .slice(0, -1)
    .map((experience) => `${experience.company} as ${experience.role}`)
    .join('\n')

  if (isJapaneseQuestion) {
    return buildParagraphs([
      `職歴としては、${pastRoles} を経験しています。`,
      `現在のプロフィール上では、${current?.period} に ${current?.role} として働いています。`,
    ])
  }

  return buildParagraphs([
    `His experience includes:\n${pastRoles}`,
    `The current profile entry says he works as an ${current?.role} from ${current?.period}.`,
  ])
}

const buildEducationReply = (isJapaneseQuestion: boolean) => {
  const education = profileChatData.education
    .map((entry) => `${entry.school} (${entry.major})`)
    .join('\n')

  if (isJapaneseQuestion) {
    return buildParagraphs([
      `学歴は ${education} です。`,
      '英語、コミュニケーション、通訳・翻訳のバックグラウンドがあります。',
    ])
  }

  return buildParagraphs([
    `His education includes:\n${education}`,
    'He has a background in English, communication, interpreting, and translation.',
  ])
}

const buildSideWorkReply = (isJapaneseQuestion: boolean) => {
  const sideWork = profileChatData.sideWork
    .map((entry) => `${entry.title} at ${entry.place}`)
    .join('\n')

  if (isJapaneseQuestion) {
    return buildParagraphs([
      `副業・メンター経験としては ${sideWork} があります。`,
      '技術だけでなく、学習方法やコードレビューを教える経験もあります。',
    ])
  }

  return buildParagraphs([
    `His side work includes:\n${sideWork}`,
    'The profile shows mentoring experience in both English learning and programming.',
  ])
}

const buildAboutReply = (isJapaneseQuestion: boolean) => {
  if (isJapaneseQuestion) {
    return buildParagraphs([
      `${profileChatData.personal.name} は日本在住の ${profileChatData.personal.role} です。`,
      `${profileChatData.personal.summary} 強みとしては、AIアプリケーション開発、Web開発、メンター経験がプロフィールに載っています。`,
    ])
  }

  return buildParagraphs([
    `${profileChatData.personal.name} is an ${profileChatData.personal.role} based in ${profileChatData.personal.location}.`,
    `${profileChatData.personal.summary} The profile highlights AI application development, web development, and mentoring experience.`,
  ])
}

const buildContactReply = (isJapaneseQuestion: boolean) => {
  if (isJapaneseQuestion) {
    return `連絡したい場合は、このサイトの ${profileChatData.contact.contactPage} ページか GitHub (${profileChatData.contact.github}) がプロフィール上の導線です。`
  }

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
  'どんなスキルがありますか？',
  '作ったものについて教えて',
  'これまでの経歴を知りたい',
  '副業やメンター経験はありますか？',
]

export const buildProfileChatReply = (question: string) => {
  const normalizedQuestion = question.trim().toLowerCase()
  const isJapaneseQuestion = getLanguageMode(question)

  if (!normalizedQuestion) {
    return isJapaneseQuestion
      ? '聞きたいことを入力してくれたら、プロフィールにある範囲で答えます。'
      : 'Ask me something and I will answer from the profile data.'
  }

  if (isGreeting(normalizedQuestion)) {
    return isJapaneseQuestion
      ? `こんにちは。${profileChatData.personal.name} について、スキル・経歴・作品・副業経験などプロフィールにある範囲で答えます。`
      : `Hi. I can answer questions about ${profileChatData.personal.name}'s skills, career, works, and side work from the profile data.`
  }

  const matchedTopic = topics.find((topic) => includesAny(normalizedQuestion, topic.keywords))

  if (matchedTopic) {
    return matchedTopic.buildReply(isJapaneseQuestion)
  }

  return 'プロフィールにある範囲だと、その質問にはまだ詳しく答えられません。From the profile data, try asking about skills, works, experience, education, or mentoring side work.'
}
