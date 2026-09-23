import { Skill, Graduate } from '@components'
import { Certificate } from '@components/List/Certificate'
import { GitContribution } from '@/features/github-contributions/GitContribution'
import { MotionSection } from '@/components/MotionSection'
import Background3D from '@/components/Background3D'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaGithub } from 'react-icons/fa6'

const Page = () => {
  return (
    <div className="pb-16 md:pb-24">
      <MotionSection
        className="relative overflow-hidden border-b border-foreground/15"
        delayIndex={0}
      >
        <Background3D className="hero-three-canvas" />
        <div
          data-hero-grid
          className="relative z-10 grid md:grid-cols-[minmax(0,1fr)_minmax(364px,0.65fr)] lg:min-h-[620px] lg:grid-cols-2 xl:min-h-[660px]"
        >
          <div className="site-gutter flex flex-col justify-center py-16 sm:py-20 lg:py-24">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              AI Application Engineer · Japan
            </p>
            <h1 className="display-heading whitespace-nowrap text-[clamp(2rem,3.25vw,3rem)] font-normal leading-none tracking-[-0.035em]">
              Yugo <span className="ml-[0.16em] italic">Ibuki</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Hello, I&apos;m Yugo. A web developer based in Japan, passionate about building
              AI-driven applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/works"
                className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                View works <FaArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="https://github.com/yugo-ibuki"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <FaGithub aria-hidden="true" /> GitHub
              </Link>
            </div>
          </div>
          <div className="site-gutter flex items-center justify-center pb-16 md:py-16 lg:py-24">
            <div className="hero-visual" role="img" aria-label="Portrait of Yugo Ibuki">
              <div className="hero-portrait shrink-0 overflow-hidden rounded-[2rem] bg-muted">
                <Image
                  src="/assets/me.jpeg"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 2560px) 352px, (max-width: 639px) 192px, (max-width: 767px) 224px, (max-width: 1023px) 256px, 304px"
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <div className="site-gutter space-y-24 py-24 md:space-y-32 md:py-32">
        <MotionSection className="grid gap-10 lg:grid-cols-12" delayIndex={1}>
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Technical skills
            </p>
          </div>
          <div className="lg:col-span-9">
            <Skill />
          </div>
        </MotionSection>

        <MotionSection
          className="grid gap-10 border-t border-foreground/15 pt-10 lg:grid-cols-12"
          delayIndex={2}
        >
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Contributions
            </p>
          </div>
          <div className="min-w-0 lg:col-span-9">
            <GitContribution />
          </div>
        </MotionSection>

        <MotionSection
          className="grid gap-16 border-t border-foreground/15 pt-10 lg:grid-cols-2"
          delayIndex={3}
        >
          <section className="space-y-8">
            <h2 className="editorial-display text-4xl tracking-[-0.04em]">Education</h2>
            <Graduate />
          </section>
          <section className="space-y-8">
            <h2 className="editorial-display text-4xl tracking-[-0.04em]">Certifications</h2>
            <Certificate />
          </section>
        </MotionSection>
      </div>
    </div>
  )
}

export default Page
