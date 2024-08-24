import { toZonedTime } from 'date-fns-tz'
import { useCallback, useMemo } from 'react'
import { addDays, differenceInWeeks, format, getDay, startOfWeek } from 'date-fns'
import type { Contribution } from './useGitContribution'

type CalendarData = {
  date: string
  count: number
  dayOfWeek: number
  weekNumber: number
}

export const useCalendar = ({ contributions }: { contributions: Contribution[] }) => {
  const getJSTDate = useCallback((date: Date): Date => {
    return toZonedTime(date, 'Asia/Tokyo')
  }, [])
  const today = getJSTDate(new Date())
  // 半年前から今日までの日付を取得
  const startDate = getJSTDate(new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()))
  const endDate = getJSTDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()))

  const totalWeeks = Math.floor(52 / 2) // 半年分にする

  const createCalendarData = (): CalendarData[] => {
    const calendarData: CalendarData[] = []
    let currentDate = startDate

    while (currentDate <= endDate) {
      const dateString = format(currentDate, 'yyyy-MM-dd')
      // 日付に対応するコントリビューションデータを取得
      const dataForDate = contributions.find((d) => d.date === dateString)
      // 週の開始日を取得
      const start = startOfWeek(startDate)

      // カレンダーデータを生成
      calendarData.push({
        date: dateString,
        count: dataForDate ? dataForDate.count : 0,
        dayOfWeek: getDay(currentDate),
        weekNumber: differenceInWeeks(currentDate, start),
      })
      currentDate = addDays(currentDate, 1)
    }

    return calendarData
  }

  const calendarData = createCalendarData()

  // カレンダーデータをインデックス化
  const indexedCalendarData = useMemo(() => {
    const indexed: { [key: string]: CalendarData } = {}
    calendarData.forEach((day) => {
      indexed[`${day.weekNumber}-${day.dayOfWeek}`] = day
    })
    return indexed
  }, [calendarData])

  return {
    totalWeeks,
    calendarData: indexedCalendarData,
  }
}
