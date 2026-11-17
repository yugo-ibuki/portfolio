import { createContributionCache } from './cache'
import type { KeyValueCache } from './cache'
import { fetchGitHubContributionCalendar } from './api'
import { getContributionDateRange } from './model'
import type { GitHubContributionCalendar } from './types'

export type ContributionEnvironment = {
  GITHUB_USER_NAME?: string
  GITHUB_API_KEY?: string
  GITHUB_CONTRIBUTIONS_KV: KeyValueCache
}

const cacheHeaders = { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800' }

export const handleContributionRequest = async (
  env: ContributionEnvironment
): Promise<Response> => {
  const username = env.GITHUB_USER_NAME
  if (!username) {
    return Response.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const cacheKey = `github_contributions_${username}`
    const cache = createContributionCache(env.GITHUB_CONTRIBUTIONS_KV)
    const cachedData = await cache.get<GitHubContributionCalendar>(cacheKey)
    if (cachedData) {
      return Response.json(cachedData, { headers: cacheHeaders })
    }
    if (!env.GITHUB_API_KEY) {
      return Response.json({ error: 'GitHub token is required' }, { status: 500 })
    }

    const { startDate, endDate } = getContributionDateRange()
    const calendar = await fetchGitHubContributionCalendar({
      token: env.GITHUB_API_KEY,
      username,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    })
    await cache.set(cacheKey, calendar)
    return Response.json(calendar, { headers: cacheHeaders })
  } catch {
    console.error('GitHub contribution request failed')
    return Response.json({ error: 'An error occurred while fetching data' }, { status: 500 })
  }
}
