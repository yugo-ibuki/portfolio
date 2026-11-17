import { afterEach, describe, expect, test } from 'bun:test'
import { handleContributionRequest } from './handler'
import type { KeyValueCache } from './cache'

const originalFetch = globalThis.fetch
const calendar = { totalContributions: 3, weeks: [] }

const makeKV = (initial: string | null = null) => {
  const entries = new Map<string, string>()
  if (initial) entries.set('github_contributions_yugo', initial)
  const kv: KeyValueCache = {
    get: async (key) => entries.get(key) ?? null,
    put: async (key, value, options) => {
      expect(options?.expirationTtl).toBe(3600)
      entries.set(key, value)
    },
  }
  return { kv, entries }
}

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('contribution request handler', () => {
  test('rejects a missing username', async () => {
    const response = await handleContributionRequest({ GITHUB_CONTRIBUTIONS_KV: makeKV().kv })
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Username is required' })
  })

  test('serves cached calendars without requiring a token or upstream request', async () => {
    globalThis.fetch = Object.assign(
      () => {
        throw new Error('Unexpected network request')
      },
      { preconnect: originalFetch.preconnect }
    )
    const response = await handleContributionRequest({
      GITHUB_USER_NAME: 'yugo',
      GITHUB_CONTRIBUTIONS_KV: makeKV(JSON.stringify(calendar)).kv,
    })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(calendar)
    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=3600, stale-while-revalidate=1800'
    )
  })

  test('rejects a missing token on cache miss without publicly caching the error', async () => {
    const response = await handleContributionRequest({
      GITHUB_USER_NAME: 'yugo',
      GITHUB_CONTRIBUTIONS_KV: makeKV().kv,
    })
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: 'GitHub token is required' })
    expect(response.headers.get('Cache-Control')).toBeNull()
  })

  test('fetches and caches the calendar using request-scoped credentials', async () => {
    const { kv, entries } = makeKV()
    globalThis.fetch = (async (_input, init) => {
      expect(new Headers(init?.headers).get('Authorization')).toBe('Bearer test-token')
      expect(JSON.parse(init?.body as string).variables.username).toBe('yugo')
      return Response.json({
        data: { user: { contributionsCollection: { contributionCalendar: calendar } } },
      })
    }) as typeof fetch
    const response = await handleContributionRequest({
      GITHUB_USER_NAME: 'yugo',
      GITHUB_API_KEY: 'test-token',
      GITHUB_CONTRIBUTIONS_KV: kv,
    })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(calendar)
    expect(JSON.parse(entries.get('github_contributions_yugo')!)).toEqual(calendar)
    expect(response.headers.get('Cache-Control')).toContain('max-age=3600')
  })

  test('does not expose upstream errors or credentials', async () => {
    globalThis.fetch = Object.assign(async () => new Response('private details', { status: 403 }), {
      preconnect: originalFetch.preconnect,
    })
    const response = await handleContributionRequest({
      GITHUB_USER_NAME: 'yugo',
      GITHUB_API_KEY: 'test-token',
      GITHUB_CONTRIBUTIONS_KV: makeKV().kv,
    })
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: 'An error occurred while fetching data' })
  })
})
