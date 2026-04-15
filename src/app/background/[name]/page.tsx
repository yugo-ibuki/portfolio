'use client'

import { Description } from '@components'
import { useSideWorkPage } from '../../../hooks/useSideWorkPage'
import NotFound from '@notFound'
import { MotionSection } from '@/components/MotionSection'

const Page = () => {
  const { data, isPageExists } = useSideWorkPage()

  if (!isPageExists) {
    return <NotFound />
  }

  return (
    <main>
      <MotionSection className="mt-[25px]" delayIndex={0}>
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">{data.title}</h3>
        </div>
        <Description subtitle={data.place}>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </Description>
      </MotionSection>
    </main>
  )
}

export default Page
