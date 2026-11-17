import { createFileRoute } from '@tanstack/react-router'
import ArticlesPage from '@/pages/ArticlesPage'

export const Route = createFileRoute('/articles')({ component: ArticlesPage })
