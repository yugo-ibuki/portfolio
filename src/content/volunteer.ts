export type VolunteerLink = {
  href: string
  label: string
  subLabel?: string
}

export type VolunteerEntry = {
  title: string
  content: string
  link?: VolunteerLink
}

export const volunteerActivities: VolunteerEntry[] = [
  {
    title: 'Movie Translate',
    content: "I volunteered to translate films in my university's.",
    link: {
      href: 'https://www.kisfvf.com/',
      label: 'Kyoto International Student Film & Video Festival',
      subLabel: '(京都国際学生映画祭)',
    },
  },
]
