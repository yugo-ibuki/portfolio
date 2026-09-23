import { Work } from '@components'
import { MotionSection } from '@/components/MotionSection'

const Works = () => {
  return (
    <div className="pb-16 md:pb-24">
      <MotionSection
        className="site-gutter flex min-h-[32vh] items-center border-b border-foreground/15 py-16 md:min-h-[36vh] md:py-20"
        delayIndex={0}
      >
        <h1 className="display-heading text-[clamp(2.5rem,4vw,3.5rem)] font-normal leading-none tracking-[-0.035em]">
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
