import type { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'
import { works } from '@/content/works'

export const Work: FC = () => {
  return (
    <div data-work-layout="editorial" className="min-w-0">
      {works.map((work, index) => {
        return (
          <article
            key={work.name}
            className="group grid min-w-0 border-b border-foreground/15 md:min-h-[380px] md:grid-cols-[minmax(300px,min(38vw,540px))_minmax(0,1fr)] lg:min-h-[400px]"
            data-featured={index === 0 ? 'true' : undefined}
          >
            <Link
              href={work.url}
              target="_blank"
              rel="noreferrer"
              className="relative block h-[240px] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:h-[280px] md:h-[380px] lg:h-[400px]"
              aria-label={`${work.name} を開く`}
            >
              <Image
                src={work.photo}
                alt={work.name}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) 100vw, (max-width: 1421px) 38vw, 540px"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0">
                <FaArrowUpRightFromSquare className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            <div className="site-gutter flex min-w-0 flex-col justify-center gap-8 py-12 md:py-10 lg:py-12">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Project {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="editorial-display text-4xl tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  {work.name}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  {work.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                {work.github && (
                  <Link
                    href={work.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    <FaGithub className="h-4 w-4" aria-hidden="true" />
                    Source
                  </Link>
                )}
                {work.github !== work.url && (
                  <Link
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    Visit
                    <FaArrowUpRightFromSquare className="h-3 w-3" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
