import { useEffect, useState } from 'react'
import { mapContributionCalendar } from './model'
import type { Contribution, GitHubContributionCalendar } from './types'

export const useGitContributions = () => {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchContributions()

    const interval = setInterval(fetchContributions, 3600 * 1000)

    return () => clearInterval(interval)
  }, [])

  const fetchContributions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/github-contributions', {
        next: { revalidate: 3600 },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub contributions')
      }

      const data = (await response.json()) as GitHubContributionCalendar

      setContributions(mapContributionCalendar(data))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, contributions }
}
