import { Description } from '@components'
import { MotionSection } from '@/components/MotionSection'
import type { getBackgroundDetail } from '@/lib/getBackgroundDetail'

type Props = {
  data: ReturnType<typeof getBackgroundDetail>
}

const Page = ({ data }: Props) => {
  return (
    <main>
      <MotionSection className="mt-[25px]" delayIndex={0}>
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h1 data-pixi-glitch className="text-2xl font-semibold tracking-tight">
            {data.title}
          </h1>
        </div>
        <Description
          subtitle={data.summary ?? data.place}
          subtitleLabel={data.summary ? 'Activities:' : undefined}
        >
          <div className="space-y-4">
            {data.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Description>
      </MotionSection>
    </main>
  )
}

export default Page
