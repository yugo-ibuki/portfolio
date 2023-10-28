'use client'

import type { NextPage } from 'next'
import { Articles as ArticleList, Block, Title } from '@components'

const Page: NextPage = () => {
  return (
    <main>
      <Block>
        <Title>Articles</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <ArticleList />
        </div>
      </Block>
    </main>
  )
}

export default Page
