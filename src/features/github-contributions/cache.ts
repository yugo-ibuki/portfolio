const CACHE_TTL_SECONDS = 3600

export type KeyValueCache = {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

export const createContributionCache = (kv: KeyValueCache) => ({
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await kv.get(key)
      return value === null ? null : (JSON.parse(value) as T)
    } catch (error) {
      console.error('Failed to read GitHub contributions cache:', error)
      return null
    }
  },

  async set(key: string, value: unknown): Promise<void> {
    try {
      await kv.put(key, JSON.stringify(value), {
        expirationTtl: CACHE_TTL_SECONDS,
      })
    } catch (error) {
      console.error('Failed to write GitHub contributions cache:', error)
    }
  },
})
