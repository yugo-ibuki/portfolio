import type { GitHubContributionCalendar } from './types'

type GitHubContributionResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: GitHubContributionCalendar
      }
    }
  }
  errors?: { type?: string }[]
}

type FailureReason = 'network' | 'http' | 'rate_limit' | 'graphql' | 'invalid_response'

export class GitHubContributionError extends Error {
  constructor(
    readonly reason: FailureReason,
    readonly status?: number
  ) {
    super('GitHub contribution request failed')
  }
}

export const GITHUB_CONTRIBUTIONS_QUERY = `
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

export const fetchGitHubContributionCalendar = async ({
  token,
  username,
  from,
  to,
}: {
  token: string
  username: string
  from: string
  to: string
}): Promise<GitHubContributionCalendar> => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'yugo-ibuki-portfolio',
    },
    body: JSON.stringify({
      query: GITHUB_CONTRIBUTIONS_QUERY,
      variables: {
        username,
        from,
        to,
      },
    }),
  }).catch(() => {
    throw new GitHubContributionError('network')
  })

  if (!response.ok) {
    throw new GitHubContributionError('http', response.status)
  }

  const data = (await response.json().catch(() => {
    throw new GitHubContributionError('invalid_response', response.status)
  })) as GitHubContributionResponse | null

  if (data?.errors?.length) {
    const isRateLimited = data.errors.some((error) => error.type === 'RATE_LIMITED')
    throw new GitHubContributionError(isRateLimited ? 'rate_limit' : 'graphql', response.status)
  }

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new GitHubContributionError('invalid_response', response.status)
  return calendar
}
