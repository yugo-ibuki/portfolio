export type Contribution = {
  date: string
  count: number
}

export type GitHubContributionDay = {
  contributionCount: number
  date: string
}

export type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[]
}

export type GitHubContributionCalendar = {
  weeks: GitHubContributionWeek[]
}

export type ContributionCalendarDay = {
  date: string
  count: number
  dayOfWeek: number
  weekNumber: number
}
