import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import {
  fetchGitHubContributionCalendar,
  getContributionDateRange,
} from '@/features/github-contributions'

export const dynamic = 'force-dynamic'

const GITHUB_TOKEN = process.env.GITHUB_API_KEY

export async function GET() {
  const username = process.env.GITHUB_USER_NAME

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const cacheKey = `github_contributions_${username}`
    const cachedData = await kv.get(cacheKey)

    if (cachedData) {
      console.log('Returning cached data', cachedData)
      const response = NextResponse.json(cachedData)
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=1800')
      return response
    }

    const { startDate, endDate } = getContributionDateRange()
    const variables = {
      username,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GitHub token is required' }, { status: 500 })
    }

    const contributionsData = await fetchGitHubContributionCalendar({
      token: GITHUB_TOKEN,
      ...variables,
    })

    console.log('Caching new data for:', username)

    // 1時間キャッシュ（3600秒）
    await kv.set(cacheKey, contributionsData, { ex: 3600 })

    const freshResponse = NextResponse.json(contributionsData)
    freshResponse.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=1800')
    return freshResponse
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 })
  }
}
