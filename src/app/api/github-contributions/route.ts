import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { getContributionDateRange } from '@/lib/githubContributions'

export const dynamic = 'force-dynamic'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_API_KEY

const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

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

    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw response.body
    }

    const data = await response.json()
    const contributionsData = data.data.user.contributionsCollection.contributionCalendar

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
