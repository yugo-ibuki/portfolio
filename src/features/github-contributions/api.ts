import type { GitHubContributionCalendar } from './types'

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
    throw response.body
  }

  const data = await response.json()

  return data.data.user.contributionsCollection.contributionCalendar
}
