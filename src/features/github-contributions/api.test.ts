import { afterEach, describe, expect, test } from 'bun:test'
import { fetchGitHubContributionCalendar } from './api'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('GitHub contributions API', () => {
  test('identifies the application with a User-Agent header', async () => {
    let headers: HeadersInit | undefined
    globalThis.fetch = (async (_input, init) => {
      headers = init?.headers
      return Response.json({
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: { weeks: [] },
            },
          },
        },
      })
    }) as typeof fetch

    await fetchGitHubContributionCalendar({
      token: 'token',
      username: 'yugo-ibuki',
      from: '2026-01-01T00:00:00.000Z',
      to: '2026-07-12T00:00:00.000Z',
    })

    expect(new Headers(headers).get('User-Agent')).toBe('yugo-ibuki-portfolio')
  })

  test('includes the GitHub response status when a request fails', async () => {
    globalThis.fetch = (async () =>
      new Response('User-Agent required', { status: 403 })) as typeof fetch

    await expect(
      fetchGitHubContributionCalendar({
        token: 'token',
        username: 'yugo-ibuki',
        from: '2026-01-01T00:00:00.000Z',
        to: '2026-07-12T00:00:00.000Z',
      })
    ).rejects.toThrow('GitHub API request failed (403): User-Agent required')
  })
})
