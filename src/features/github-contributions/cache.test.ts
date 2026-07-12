import { describe, expect, test } from 'bun:test'
import { createContributionCache } from './cache'

type StoredValue = {
  value: string
  expirationTtl?: number
}

const createKv = () => {
  const values = new Map<string, StoredValue>()

  return {
    values,
    kv: {
      async get(key: string) {
        return values.get(key)?.value ?? null
      },
      async put(key: string, value: string, options?: { expirationTtl?: number }) {
        values.set(key, { value, expirationTtl: options?.expirationTtl })
      },
    },
  }
}

describe('GitHub contributions cache', () => {
  test('returns parsed contribution data for a cache hit', async () => {
    const { kv, values } = createKv()
    values.set('github_contributions_yugo', {
      value: JSON.stringify({ totalContributions: 42 }),
    })

    const cache = createContributionCache(kv)

    expect(await cache.get('github_contributions_yugo')).toEqual({
      totalContributions: 42,
    })
  })

  test('returns null for a cache miss', async () => {
    const { kv } = createKv()
    const cache = createContributionCache(kv)

    expect(await cache.get('github_contributions_yugo')).toBeNull()
  })

  test('stores serialized data with a one-hour TTL', async () => {
    const { kv, values } = createKv()
    const cache = createContributionCache(kv)

    await cache.set('github_contributions_yugo', { totalContributions: 42 })

    expect(values.get('github_contributions_yugo')).toEqual({
      value: JSON.stringify({ totalContributions: 42 }),
      expirationTtl: 3600,
    })
  })

  test('treats a KV read error as a cache miss', async () => {
    const cache = createContributionCache({
      async get() {
        throw new Error('KV unavailable')
      },
      async put() {},
    })

    expect(await cache.get('github_contributions_yugo')).toBeNull()
  })

  test('does not reject when a KV write fails', async () => {
    const cache = createContributionCache({
      async get() {
        return null
      },
      async put() {
        throw new Error('KV unavailable')
      },
    })

    await expect(
      cache.set('github_contributions_yugo', { totalContributions: 42 })
    ).resolves.toBeUndefined()
  })
})
