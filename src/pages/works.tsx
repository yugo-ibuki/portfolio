import type { NextPage } from 'next'
import { Title, Block, Work } from '@components'
import type { NextPageContext } from 'next'
import { checkUa } from '@libs/checkUa'

const Works: NextPage = () => {
  return (
    <div>
      <Block>
        <Title>WHAT I HAVE BEEN DOING</Title>
        <div className={'mt-[25px]'}>
          <Work />
        </div>
      </Block>
    </div>
  )
}

Works.getInitialProps = async ({ req }: NextPageContext) => {
  const ua = checkUa(req)
  return { ua }
}

export default Works