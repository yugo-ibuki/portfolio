import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/presentation')({
  beforeLoad: () => {
    throw redirect({ to: '/articles', search: true, statusCode: 308 })
  },
})
