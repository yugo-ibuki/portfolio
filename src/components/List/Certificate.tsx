import type { FC } from 'react'
import { Separator } from '@/components/components/ui/separator'
import { certificates } from '@/content/certificates'
import type { CertificateEntry } from '@/content/certificates'

type CertificateGroup = {
  name: string
  values: CertificateEntry['value'][]
}

// 同じ名前の資格（例: Google Cloud Certification）を1グループにまとめる
const groupByName = (entries: CertificateEntry[]): CertificateGroup[] => {
  const groups = new Map<string, CertificateGroup>()

  for (const entry of entries) {
    const group = groups.get(entry.name)

    if (group) {
      group.values.push(entry.value)
    } else {
      groups.set(entry.name, { name: entry.name, values: [entry.value] })
    }
  }

  return Array.from(groups.values())
}

export const Certificate: FC = () => {
  const groups = groupByName(certificates)

  return (
    <div className="space-y-6">
      {groups.map((group, index) => (
        <div key={group.name} className="space-y-4">
          {group.values.length === 1 ? (
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium">{group.name}</span>
              <span className="text-muted-foreground tabular-nums">{group.values[0]}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{group.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {group.values.length} certifications
                </span>
              </div>
              <ul className="space-y-1 pl-4 text-muted-foreground">
                {group.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
          {index < groups.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
