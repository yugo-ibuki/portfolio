import { describe, expect, test } from 'bun:test'
import { formatSkillTerm } from './formatSkillTerm'

describe('formatSkillTerm', () => {
  test('shows whole and fractional years with a y suffix', () => {
    expect(formatSkillTerm(1)).toBe('1y')
    expect(formatSkillTerm(5.5)).toBe('5.5y')
  })

  test('shows terms under a year in months', () => {
    expect(formatSkillTerm(0.5)).toBe('6mo')
    expect(formatSkillTerm(0.25)).toBe('3mo')
  })

  test('shows at least one month for very short terms', () => {
    expect(formatSkillTerm(0.01)).toBe('1mo')
  })
})
