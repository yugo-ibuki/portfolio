import { Skill, Graduate } from '@components'
import { Certificate } from '@components/List/Certificate'
import { GitContribution } from '@/features/github-contributions'
import { MotionSection } from '@/components/MotionSection'

const Page = () => {
  return (
    <div className="flex flex-col gap-20 pb-24">
      <MotionSection className="space-y-6" delayIndex={0}>
        <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          Technical Skills
        </h3>
        <Skill />
      </MotionSection>

      <MotionSection className="space-y-6" delayIndex={1}>
        <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          Contributions
        </h3>
        <GitContribution />
      </MotionSection>

      <MotionSection className="space-y-6" delayIndex={2}>
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">Education</h3>
        </div>
        <Graduate />
      </MotionSection>

      <MotionSection className="space-y-6" delayIndex={3}>
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">Certifications</h3>
        </div>
        <Certificate />
      </MotionSection>
    </div>
  )
}

export default Page
