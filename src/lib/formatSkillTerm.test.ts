import { describe, expect, test } from 'bun:test'
import { formatSkillTerm } from './formatSkillTerm'

describe('formatSkillTerm', () => {
  test('uses the singular form for exactly one year', () => {
    expect(formatSkillTerm(1)).toBe('1 year')
  })

  test('uses the plural form for other year counts', () => {
    expect(formatSkillTerm(2)).toBe('2 years')
    expect(formatSkillTerm(5.5)).toBe('5.5 years')
  })

  test('shows terms under a year in months', () => {
    expect(formatSkillTerm(0.5)).toBe('6 months')
    expect(formatSkillTerm(0.25)).toBe('3 months')
    expect(formatSkillTerm(0.2)).toBe('2 months')
  })

  test('shows at least one month for very short terms', () => {
    expect(formatSkillTerm(0.01)).toBe('1 month')
  })
})
