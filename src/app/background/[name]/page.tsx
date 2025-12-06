'use client'

import { Description } from '@components'
import { useSideWorkPage } from '../../../hooks/useSideWorkPage'
import NotFound from '@notFound'

const Page = () => {
  const { data, isPageExists } = useSideWorkPage()

  if (!isPageExists) {
    return <NotFound />
  }

  return (
    <main>
      <div className="mt-[25px]">
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            {data.title}
          </h3>
        </div>
        <Description subtitle={data.place}>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </Description>
      </div>
    </main>
  )
}

export default Page
