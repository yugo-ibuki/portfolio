import { createFileRoute } from '@tanstack/react-router'
import BackgroundDetailPage from '@/pages/BackgroundDetailPage'
import { getBackgroundDetail } from '@/lib/getBackgroundDetail'

export const Route = createFileRoute('/background/$name')({
  loader: ({ params }) => getBackgroundDetail(params.name),
  component: DetailRoute,
})

function DetailRoute() {
  return <BackgroundDetailPage data={Route.useLoaderData()} />
}
