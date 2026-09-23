import type { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'
import { works } from '@/content/works'

export const Work: FC = () => {
  return (
    <div data-work-layout="editorial" className="grid min-w-0 gap-8 xl:grid-cols-2">
      {works.map((work, index) => {
        return (
          <article
            key={work.name}
            className="group grid min-w-0 overflow-hidden border border-foreground/15 md:min-h-[300px] md:grid-cols-[minmax(240px,34%)_minmax(0,1fr)] xl:grid-cols-[minmax(220px,min(42%,360px))_minmax(0,1fr)]"
            data-featured={index === 0 ? 'true' : undefined}
          >
            <Link
              href={work.url}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-[16/10] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:aspect-auto md:h-full md:min-h-[300px]"
              aria-label={`${work.name} を開く`}
            >
              <Image
                src={work.photo}
                alt={work.name}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 34vw, (max-width: 1799px) 20vw, 360px"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0">
                <FaArrowUpRightFromSquare className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            <div className="flex min-w-0 flex-col justify-center gap-7 p-6 sm:p-8 lg:p-10">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Project {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="editorial-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
                  {work.name}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
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
