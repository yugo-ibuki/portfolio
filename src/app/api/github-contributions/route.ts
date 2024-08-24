import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const GITHUB_API_URL = 'https://api.github.com/graphql'
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
      return NextResponse.json(cachedData)
    }

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

    // 2時間キャッシュ
    await kv.set(cacheKey, contributionsData, { ex: 7200 })

    return NextResponse.json(contributionsData)
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 })
  }
}
