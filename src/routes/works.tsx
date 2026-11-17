import { createFileRoute } from '@tanstack/react-router'
import WorksPage from '@/pages/WorksPage'

export const Route = createFileRoute('/works')({ component: WorksPage })
