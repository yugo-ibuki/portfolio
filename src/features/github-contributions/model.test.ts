import { describe, expect, test } from 'bun:test'
import { buildContributionCalendar } from './model'

describe('github contributions model', () => {
  test('builds a contribution grid for roughly one year', () => {
    const { totalWeeks, calendarData } = buildContributionCalendar([])

    expect(totalWeeks >= 52 && totalWeeks <= 54).toBe(true)
    expect(Object.keys(calendarData).length > 300).toBe(true)
  })
})
