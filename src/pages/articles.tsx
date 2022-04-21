import type { FC } from 'react'
import { Block, Articles as ArticleList, Title } from '@components'

const Articles: FC = () => {
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

export default Articles