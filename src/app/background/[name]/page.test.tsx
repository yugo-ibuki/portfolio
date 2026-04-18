import { describe, expect, test } from 'bun:test'

describe('background detail page', () => {
  test('exports generateStaticParams for internal side work entries', async () => {
    const pageModule = await import('./page')

    expect(typeof pageModule.generateStaticParams).toBe('function')

    const params = await pageModule.generateStaticParams?.()

    expect(Array.isArray(params)).toBe(true)
    expect(params?.some((param) => param.name === 'english_mentor')).toBe(true)
    expect(params?.some((param) => param.name === 'programming_mentor')).toBe(true)
    expect(params?.some((param) => param.name === 'programming_mentor_2')).toBe(true)
  })
})
