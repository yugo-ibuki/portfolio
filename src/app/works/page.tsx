import { Work } from '@components'
import { MotionSection } from '@/components/MotionSection'

const Works = () => {
  return (
    <div className="site-gutter space-y-16 pb-16 pt-10 sm:pt-12 md:space-y-24 md:pb-24 md:pt-16 lg:pt-20">
      <MotionSection className="border-b border-foreground/15 pb-10 md:pb-12" delayIndex={0}>
        <h1
          data-pixi-glitch
          className="display-heading text-[clamp(2.5rem,4vw,3.5rem)] font-normal leading-none tracking-[-0.035em]"
        >
          What I have built
        </h1>
      </MotionSection>
      <MotionSection delayIndex={1}>
        <Work />
      </MotionSection>
    </div>
  )
}

export default Works
