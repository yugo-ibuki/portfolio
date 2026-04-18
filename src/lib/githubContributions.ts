import { addDays, differenceInCalendarWeeks, format, getDay, startOfWeek } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import type { Contribution } from '@hooks/useGitContribution'

const CONTRIBUTION_TIMEZONE = 'Asia/Tokyo'

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

export const getContributionDateRange = (referenceDate = new Date()) => {
  const today = toZonedTime(referenceDate, CONTRIBUTION_TIMEZONE)
  const startDate = toZonedTime(
    new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
    CONTRIBUTION_TIMEZONE
  )
  const endDate = toZonedTime(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    CONTRIBUTION_TIMEZONE
  )

  return { startDate, endDate }
}

export const mapContributionCalendar = (calendar: GitHubContributionCalendar): Contribution[] => {
  return calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }))
  )
}

export const buildContributionCalendar = (
  contributions: Contribution[],
  referenceDate = new Date()
) => {
  const { startDate, endDate } = getContributionDateRange(referenceDate)
  const gridStart = startOfWeek(startDate)
  const contributionsByDate = new Map(contributions.map((day) => [day.date, day.count]))
  const calendarData: Record<string, ContributionCalendarDay> = {}
  let currentDate = startDate

  while (currentDate <= endDate) {
    const dateString = format(currentDate, 'yyyy-MM-dd')
    const weekNumber = differenceInCalendarWeeks(currentDate, gridStart)
    const dayOfWeek = getDay(currentDate)

    calendarData[`${weekNumber}-${dayOfWeek}`] = {
      date: dateString,
      count: contributionsByDate.get(dateString) ?? 0,
      dayOfWeek,
      weekNumber,
    }

    currentDate = addDays(currentDate, 1)
  }

  return {
    totalWeeks: differenceInCalendarWeeks(endDate, gridStart) + 1,
    calendarData,
  }
}
