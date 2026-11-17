import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'
import { handleContributionRequest } from '@/features/github-contributions/handler'

export const Route = createFileRoute('/api/github-contributions')({
  server: {
    handlers: { GET: () => handleContributionRequest(env) },
  },
})
