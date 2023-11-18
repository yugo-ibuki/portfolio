'use client'

import { Description, Title } from '@components'
import { Box } from '@chakra-ui/react'
import { useSideWorkPage } from '../../../hooks/useSideWorkPage'
import NotFound from '@notFound'

const Page = () => {
  const { data, isPageExists } = useSideWorkPage()

  if (!isPageExists) {
    return <NotFound />
  }

  return (
    <main>
      <Box className={'mt-[25px]'}>
        <Title>{data.title}</Title>
        <Description subtitle={data.place}>{data.description}</Description>
      </Box>
    </main>
  )
}

export default Page
