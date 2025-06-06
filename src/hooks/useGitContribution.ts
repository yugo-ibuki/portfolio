import { useEffect, useState } from 'react'

export type Contribution = {
  date: string
  count: number
}

export const useGitContribution = () => {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // eslint-disable-next-line
    ;(async () => {
      await fetchContributions()
    })()

    // 1時間ごとに自動更新
    const interval = setInterval(fetchContributions, 3600 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchContributions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/github-contributions`, {
        next: { revalidate: 3600 }, // 1時間でrevalidate
      })

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub contributions')
      }

      const res = await response.json()
      const contributionsData = res.weeks
        .flatMap((week: any) => week.contributionDays)
        .map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
        }))

      setContributions(contributionsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, contributions }
}
