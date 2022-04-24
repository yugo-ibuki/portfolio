import type { NextPage } from 'next'
import { Block, Title, Step } from '@components'
import type { NextPageContext } from 'next'
import { checkUa } from '@libs/checkUa'

const Background: NextPage = () => {
 return (
   <main>
     <Block>
       <Title>EXPERIENCE</Title>
       <div className={'mt-[25px] w-[90%] mx-auto'}>
         <Step />
       </div>
     </Block>
   </main>
  )
}

Background.getInitialProps = async ({ req }: NextPageContext) => {
  const ua = checkUa(req)
  return { ua }
}

export default Background
