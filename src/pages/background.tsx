import type { NextPage } from 'next'
import { Block, Title, Step } from '@components'

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

export default Background
