import type { NextPage } from 'next'
import { Block, Title, Step } from '@components'
import { Volunteer } from '@components/List/Volunteer'

const Background: NextPage = () => {
 return (
   <main>
     <Block>
       <Title>EXPERIENCE</Title>
       <div className={'mt-[25px] w-[90%] mx-auto'}>
         <Step />
       </div>
     </Block>

     <Block>
       <Title>VOLUNTEER</Title>
       <div className={'mt-[25px] w-[90%] mx-auto'}>
         <Volunteer />
       </div>
     </Block>
   </main>
  )
}

export default Background
