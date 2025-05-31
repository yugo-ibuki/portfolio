import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_API_KEY

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
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

    const now = new Date()
    const halfAYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const variables = { username, from: halfAYearAgo.toISOString(), to: now.toISOString() }

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
