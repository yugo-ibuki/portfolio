import { Block, Articles as ArticleList, Title } from '@components'
import type { NextPageContext } from 'next'
import { checkUa } from '@libs/checkUa'
import type { NextPage } from 'next'

const Articles: NextPage = () => {
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

Articles.getInitialProps = async ({ req }: NextPageContext) => {
  const ua = checkUa(req)
  return { ua }
}

export default Articles