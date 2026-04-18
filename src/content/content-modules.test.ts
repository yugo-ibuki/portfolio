import { describe, expect, test } from 'bun:test'

describe('content modules', () => {
  test('exports the portfolio content collections from dedicated modules', async () => {
    const worksModule = await import('./works')
    const articlesModule = await import('./articles')
    const presentationsModule = await import('./presentations')
    const educationModule = await import('./education')
    const experienceModule = await import('./experience')
    const certificatesModule = await import('./certificates')
    const volunteerModule = await import('./volunteer')
    const skillsModule = await import('./skills')

    expect(Array.isArray(worksModule.works)).toBe(true)
    expect(Array.isArray(articlesModule.articles)).toBe(true)
    expect(Array.isArray(presentationsModule.presentations)).toBe(true)
    expect(Array.isArray(educationModule.educationHistory)).toBe(true)
    expect(Array.isArray(experienceModule.experiences)).toBe(true)
    expect(Array.isArray(certificatesModule.certificates)).toBe(true)
    expect(Array.isArray(volunteerModule.volunteerActivities)).toBe(true)
    expect(typeof skillsModule.skills).toBe('object')
  })
})
