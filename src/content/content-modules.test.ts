import { describe, expect, test } from 'bun:test'

describe('content modules', () => {
  test('exports the portfolio content collections from dedicated modules', async () => {
    const worksModule = await import('./works')
    const articlesModule = await import('./articles')
    const presentationsModule = await import('./presentations')
    const publicationsModule = await import('./publications')
    const educationModule = await import('./education')
    const experienceModule = await import('./experience')
    const certificatesModule = await import('./certificates')
    const volunteerModule = await import('./volunteer')
    const skillsModule = await import('./skills')

    expect(Array.isArray(worksModule.works)).toBe(true)
    expect(Array.isArray(articlesModule.articles)).toBe(true)
    expect(Array.isArray(presentationsModule.presentations)).toBe(true)
    expect(Array.isArray(publicationsModule.publications)).toBe(true)
    expect(Array.isArray(educationModule.educationHistory)).toBe(true)
    expect(Array.isArray(experienceModule.experiences)).toBe(true)
    expect(Array.isArray(certificatesModule.certificates)).toBe(true)
    expect(Array.isArray(volunteerModule.volunteerActivities)).toBe(true)
    expect(typeof skillsModule.skills).toBe('object')
  })

  test('describes the Platform Engineering book as a review contribution', async () => {
    const { publications } = await import('./publications')
    const platformEngineeringBook = publications.find(
      (publication) => publication.name === 'Kubernetesで実践する Platform Engineering'
    )

    expect(platformEngineeringBook).toEqual({
      name: 'Kubernetesで実践する Platform Engineering',
      link: 'https://www.shoeisha.co.jp/book/detail/9784798188379',
      publishedAt: '2025/02',
      contribution: 'Translation review contribution',
      description:
        'Supported the Japanese edition through technical translation checking and review assistance.',
    })
    expect(platformEngineeringBook?.contribution).not.toContain('Translator')
    expect(platformEngineeringBook?.description).not.toContain('translator')
  })
})
