import { Description } from '@components'
import { MotionSection } from '@/components/MotionSection'
import { getSideWorkBySlug, internalSideWorks } from '@/content/background'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    name: string
  }>
}

export const generateStaticParams = async () => {
  return internalSideWorks.map((sideWork) => ({
    name: sideWork.slug,
  }))
}

const Page = async ({ params }: Props) => {
  const { name } = await params
  const data = getSideWorkBySlug(name)

  if (!data) {
    notFound()
  }

  return (
    <main>
      <MotionSection className="mt-[25px]" delayIndex={0}>
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">{data.title}</h3>
        </div>
        <Description subtitle={data.place}>
          <div className="space-y-4">
            {data.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Description>
      </MotionSection>
    </main>
  )
}

export default Page
