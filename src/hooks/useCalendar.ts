import { useMemo } from 'react'
import type { Contribution } from './useGitContribution'
import { buildContributionCalendar } from '@/lib/githubContributions'

export const useCalendar = ({ contributions }: { contributions: Contribution[] }) => {
  return useMemo(() => buildContributionCalendar(contributions), [contributions])
}
