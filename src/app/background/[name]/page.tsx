'use client'

import { Description, Title } from '@components'
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
        <Title>{data.title}</Title>
        <Description subtitle={data.place}>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </Description>
      </div>
    </main>
  )
}

export default Page
