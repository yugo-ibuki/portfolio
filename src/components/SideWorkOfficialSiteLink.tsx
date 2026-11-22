import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import type { InternalSideWork } from '@/content/background'

type Props = Pick<InternalSideWork, 'title' | 'officialSiteUrl'>

export const SideWorkOfficialSiteLink = ({ title, officialSiteUrl }: Props) => {
  if (!officialSiteUrl) return null

  return (
    <a
      href={officialSiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} official site (opens in a new tab)`}
      className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
    >
      Official site
      <FaArrowUpRightFromSquare className="h-3 w-3" aria-hidden="true" />
    </a>
  )
}
