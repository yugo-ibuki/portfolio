import { describe, expect, test } from 'bun:test'

describe('github contributions feature', () => {
  test('exposes dedicated feature modules', async () => {
    const modelModule = await import('./model')
    const hookModule = await import('./useGitContributions')
    const componentModule = await import('./GitContribution')

    expect(typeof modelModule.buildContributionCalendar).toBe('function')
    expect(typeof modelModule.mapContributionCalendar).toBe('function')
    expect(typeof hookModule.useGitContributions).toBe('function')
    expect(typeof componentModule.GitContribution).toBe('function')
  })
})
