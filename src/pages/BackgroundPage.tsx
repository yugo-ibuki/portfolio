import { Step, SideWork } from '@components'
import { Volunteer } from '@components/List/Volunteer'
import { MotionSection } from '@/components/MotionSection'

const Background = () => {
  return (
    <div className="site-gutter space-y-20 pb-16 pt-10 sm:pt-12 md:space-y-28 md:pb-24 md:pt-16 lg:pt-20">
      <MotionSection className="border-b border-foreground/15 pb-10 md:pb-12" delayIndex={0}>
        <h1
          data-pixi-glitch
          className="display-heading text-[clamp(2.5rem,4vw,3.5rem)] font-normal leading-none tracking-[-0.035em]"
        >
          Background
        </h1>
      </MotionSection>

      <MotionSection className="grid gap-8 lg:grid-cols-12" delayIndex={1}>
        <h2
          data-pixi-glitch
          className="editorial-display text-4xl tracking-[-0.04em] lg:col-span-3"
        >
          Experience
        </h2>
        <div className="lg:col-span-9">
          <Step />
        </div>
      </MotionSection>

      <MotionSection
        className="grid gap-8 border-t border-foreground/15 pt-10 lg:grid-cols-12"
        delayIndex={2}
      >
        <h2
          data-pixi-glitch
          className="editorial-display text-4xl tracking-[-0.04em] lg:col-span-3"
        >
          Side work
        </h2>
        <div className="lg:col-span-9">
          <SideWork />
        </div>
      </MotionSection>

      <MotionSection
        className="grid gap-8 border-t border-foreground/15 pt-10 lg:grid-cols-12"
        delayIndex={3}
      >
        <h2
          data-pixi-glitch
          className="editorial-display text-4xl tracking-[-0.04em] lg:col-span-3"
        >
          Volunteer
        </h2>
        <div className="lg:col-span-9">
          <Volunteer />
        </div>
      </MotionSection>
    </div>
  )
}

export default Background
