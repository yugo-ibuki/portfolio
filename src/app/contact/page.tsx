import type { FC } from 'react'
import { MotionSection } from '@/components/MotionSection'

const EMAIL_ADDRESS = 'y.ibuki91@gmail.com'

const Contact: FC = () => {
  return (
    <MotionSection
      className="site-gutter flex min-h-[56vh] items-center py-16 md:py-20"
      delayIndex={0}
    >
      <div className="min-w-0">
        <h1 className="display-heading mb-8 text-[clamp(2.5rem,4vw,3.5rem)] font-normal leading-none tracking-[-0.035em]">
          Get in touch
        </h1>
        <p className="text-lg text-muted-foreground mb-4">Feel free to reach out via email:</p>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="break-all border-b border-primary/30 text-xl font-medium text-primary transition-colors hover:border-primary sm:text-3xl"
        >
          {EMAIL_ADDRESS}
        </a>
      </div>
    </MotionSection>
  )
}

export default Contact
