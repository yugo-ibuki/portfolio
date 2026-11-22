import { sideWorkReferenceCategories, type InternalSideWork } from '@/content/background'

type Props = {
  references: NonNullable<InternalSideWork['references']>
}

export const SideWorkReferences = ({ references }: Props) => {
  if (!references.length) return null

  return (
    <div className="space-y-3 border-l border-border pl-3 sm:pl-4">
      {sideWorkReferenceCategories.map((category) => {
        const entries = references.filter((reference) => reference.category === category)
        if (!entries.length) return null

        return (
          <section key={category} aria-label={category} className="space-y-2">
            <h3 className="text-sm font-medium">{category}</h3>
            <ul className="space-y-2">
              {entries.map((reference) => (
                <li key={reference.url}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-md border bg-card p-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {reference.thumbnail && (
                      <img
                        src={reference.thumbnail}
                        alt=""
                        width={64}
                        height={36}
                        loading="lazy"
                        decoding="async"
                        className="h-9 w-16 shrink-0 rounded-sm object-cover"
                      />
                    )}
                    <span className="min-w-0">
                      <span className="block">{reference.title}</span>
                      {reference.japaneseTitle && (
                        <span lang="ja" className="mt-0.5 block text-xs">
                          {reference.japaneseTitle}
                        </span>
                      )}
                      {reference.contribution && (
                        <span className="mt-1 block text-xs leading-relaxed">
                          <strong className="font-medium text-foreground">
                            {reference.contribution.role}
                          </strong>
                          {' — '}
                          {reference.contribution.description}
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
