import type { GitHubContributionCalendar } from './types'

type GitHubContributionResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: GitHubContributionCalendar
      }
    }
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
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(`GitHub API request failed (${response.status}): ${errorMessage}`)
  }

  const data = (await response.json()) as GitHubContributionResponse

  return data.data.user.contributionsCollection.contributionCalendar
}
