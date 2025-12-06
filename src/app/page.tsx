import { Skill, Graduate } from '@components'
import type { NextPage } from 'next'
import { Certificate } from '@components/List/Certificate'
import { GitContribution } from '@components/GitContribution'

const Page: NextPage = () => {
  return (
    <div className="flex flex-col gap-20 pb-24">

      {/* Skills Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          Technical Skills
        </h3>
        <Skill />
      </div>

      {/* Contributions Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          Contributions
        </h3>
        <GitContribution />
      </div>

      {/* History / Education */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            Education
          </h3>
        </div>
        <Graduate />
      </div>

      {/* Certificates */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            Certifications
          </h3>
        </div>
        <Certificate />
      </div>

    </div>
  )
}

export default Page
