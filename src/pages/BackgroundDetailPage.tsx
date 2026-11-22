import { Description } from '@components'
import { MotionSection } from '@/components/MotionSection'
import { SideWorkOfficialSiteLink } from '@/components/SideWorkOfficialSiteLink'
import { SideWorkReferences } from '@/components/SideWorkReferences'
import type { getBackgroundDetail } from '@/lib/getBackgroundDetail'

type Props = {
  data: ReturnType<typeof getBackgroundDetail>
}

const Page = ({ data }: Props) => {
  return (
    <div className="site-gutter py-10 md:py-16 lg:py-20">
      <MotionSection className="mt-[25px]" delayIndex={0}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b pb-2 mb-4">
          <h1 data-pixi-glitch className="text-2xl font-semibold tracking-tight">
            {data.title}
          </h1>
          <SideWorkOfficialSiteLink {...data} />
        </div>
        <Description
          subtitle={data.summary ?? data.place}
          subtitleLabel={data.summary ? 'Activities:' : undefined}
        >
          <div className="space-y-4">
            {data.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {data.references && <SideWorkReferences references={data.references} />}
          </div>
        </Description>
      </MotionSection>
    </div>
  )
}

export default Page
