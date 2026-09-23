import { Presentations } from '@components/List/Presentations'
import { MotionSection } from '@/components/MotionSection'

const PresentationPage = () => {
  return (
    <div className="site-gutter space-y-16 pb-16 pt-10 sm:pt-12 md:space-y-24 md:pb-24 md:pt-16 lg:pt-20">
      <MotionSection className="border-b border-foreground/15 pb-10 md:pb-12" delayIndex={0}>
        <h1 className="display-heading text-[clamp(2.5rem,4vw,3.5rem)] font-normal leading-none tracking-[-0.035em]">
          Presentations
        </h1>
      </MotionSection>
      <MotionSection className="grid gap-8 lg:grid-cols-12" delayIndex={1}>
        <div className="hidden lg:block lg:col-span-3" aria-hidden="true" />
        <div className="lg:col-span-9">
          <Presentations />
        </div>
      </MotionSection>
    </div>
  )
}

export default PresentationPage
