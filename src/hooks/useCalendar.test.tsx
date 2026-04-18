import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { useCalendar } from './useCalendar'

const CalendarHarness = () => {
  const { totalWeeks, calendarData } = useCalendar({ contributions: [] })

  return (
    <div
      data-total-weeks={String(totalWeeks)}
      data-calendar-cells={String(Object.keys(calendarData).length)}
    />
  )
}

describe('useCalendar', () => {
  test('builds a contribution grid for roughly one year', () => {
    const markup = renderToStaticMarkup(<CalendarHarness />)

    expect(/data-total-weeks="5[2-4]"/.test(markup)).toBe(true)
    expect(markup.includes('data-total-weeks="26"')).toBe(false)
  })
})
