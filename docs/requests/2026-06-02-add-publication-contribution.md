# Add Publication Contribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the book translation-check contribution to the portfolio site as a public publication contribution, without presenting it as a translation credit or tying it to a company.

**Architecture:** Keep the existing content-driven structure. Add a dedicated `publications` content module and a matching list component, then render it on the existing `/articles` page under a broader writing/publications heading. Do not create a new nav item while there is only one publication entry.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS, shadcn/ui `Card` and `Badge`, Bun test runner.

---

## Requirements

- Target repository: `/Users/yugo/ghq/github.com/yugo-ibuki/portfolio`.
- Do not modify `/Users/yugo/ghq/github.com/yugo-ibuki/resume`.
- Add the book as an individual public contribution, not as a work project and not as a company-linked item.
- Use wording that accurately describes the role as translation checking/review assistance.
- Do not describe Yugo as the translator.
- Do not mention a company name in the visible portfolio text.
- Book link: `https://www.shoeisha.co.jp/book/detail/9784798188379`.
- Book title: `Kubernetesで実践する Platform Engineering`.
- Publication month: `2025/02`.
- Recommended visible role label: `Translation review contribution`.

## File Structure

- Create `src/content/publications.ts`.
  - Owns the publication contribution data.
  - Exports `PublicationEntry` and `publications`.
- Create `src/components/List/Publications.tsx`.
  - Owns the publication cards.
  - Uses the same visual pattern as `Articles` and `Presentations`.
- Modify `src/components/List/index.tsx`.
  - Re-export `Publications`.
- Modify `src/content/content-modules.test.ts`.
  - Verify the new content module exports `publications`.
  - Verify the publication entry does not use translator wording.
- Modify `src/app/articles/page.tsx`.
  - Change the page heading from `WRITING PLATFORMS` to `WRITING & PUBLICATIONS`.
  - Keep existing article platform cards.
  - Add a second section for publications.

## Task 1: Add Publication Content

**Files:**
- Create: `src/content/publications.ts`
- Modify: `src/content/content-modules.test.ts`

- [ ] **Step 1: Write the content module test first**

Update `src/content/content-modules.test.ts` to include the new module and role wording checks:

```ts
import { describe, expect, test } from 'bun:test'

describe('content modules', () => {
  test('exports the portfolio content collections from dedicated modules', async () => {
    const worksModule = await import('./works')
    const articlesModule = await import('./articles')
    const presentationsModule = await import('./presentations')
    const publicationsModule = await import('./publications')
    const educationModule = await import('./education')
    const experienceModule = await import('./experience')
    const certificatesModule = await import('./certificates')
    const volunteerModule = await import('./volunteer')
    const skillsModule = await import('./skills')

    expect(Array.isArray(worksModule.works)).toBe(true)
    expect(Array.isArray(articlesModule.articles)).toBe(true)
    expect(Array.isArray(presentationsModule.presentations)).toBe(true)
    expect(Array.isArray(publicationsModule.publications)).toBe(true)
    expect(Array.isArray(educationModule.educationHistory)).toBe(true)
    expect(Array.isArray(experienceModule.experiences)).toBe(true)
    expect(Array.isArray(certificatesModule.certificates)).toBe(true)
    expect(Array.isArray(volunteerModule.volunteerActivities)).toBe(true)
    expect(typeof skillsModule.skills).toBe('object')
  })

  test('describes the Platform Engineering book as a review contribution', async () => {
    const { publications } = await import('./publications')
    const platformEngineeringBook = publications.find(
      (publication) => publication.name === 'Kubernetesで実践する Platform Engineering'
    )

    expect(platformEngineeringBook).toEqual({
      name: 'Kubernetesで実践する Platform Engineering',
      link: 'https://www.shoeisha.co.jp/book/detail/9784798188379',
      publishedAt: '2025/02',
      contribution: 'Translation review contribution',
      description:
        'Supported the Japanese edition through technical translation checking and review assistance.',
    })
    expect(platformEngineeringBook?.contribution).not.toContain('Translator')
    expect(platformEngineeringBook?.description).not.toContain('translator')
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
bun test src/content/content-modules.test.ts
```

Expected result: the test fails because `src/content/publications.ts` does not exist yet.

- [ ] **Step 3: Add the publications content module**

Create `src/content/publications.ts`:

```ts
export type PublicationEntry = {
  name: string
  link: string
  publishedAt: string
  contribution: string
  description: string
}

export const publications: PublicationEntry[] = [
  {
    name: 'Kubernetesで実践する Platform Engineering',
    link: 'https://www.shoeisha.co.jp/book/detail/9784798188379',
    publishedAt: '2025/02',
    contribution: 'Translation review contribution',
    description:
      'Supported the Japanese edition through technical translation checking and review assistance.',
  },
]
```

- [ ] **Step 4: Run the content module test**

Run:

```bash
bun test src/content/content-modules.test.ts
```

Expected result: all tests in `src/content/content-modules.test.ts` pass.

- [ ] **Step 5: Commit Task 1**

Run:

```bash
git add src/content/publications.ts src/content/content-modules.test.ts
git commit -m "feat: add publication contribution content"
```

## Task 2: Add Publications List Component

**Files:**
- Create: `src/components/List/Publications.tsx`
- Modify: `src/components/List/index.tsx`

- [ ] **Step 1: Create the publications list component**

Create `src/components/List/Publications.tsx`:

```tsx
import type { FC } from 'react'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Badge } from '@/components/components/ui/badge'
import { Card, CardContent } from '@/components/components/ui/card'
import { publications } from '@/content/publications'

export const Publications: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {publications.map((publication) => (
        <Card key={publication.name} className="group hover:shadow-md transition-shadow">
          <Link href={publication.link} target="_blank">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {publication.name}
                </h3>
                <FaExternalLinkAlt className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{publication.publishedAt}</Badge>
                <Badge variant="outline">{publication.contribution}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{publication.description}</p>
              <div className="text-xs text-muted-foreground mt-2 truncate">
                {publication.link}
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Export the component from the list barrel**

Update `src/components/List/index.tsx`:

```ts
export * from './Skill'
export * from './Graduate'
export * from './Work'

export * from './Step'
export * from './SideWork'
export * from './Articles'
export * from './Presentations'
export * from './Publications'
```

- [ ] **Step 3: Run lint for the new files**

Run:

```bash
bun run lint
```

Expected result: ESLint exits successfully.

- [ ] **Step 4: Commit Task 2**

Run:

```bash
git add src/components/List/Publications.tsx src/components/List/index.tsx
git commit -m "feat: add publications list component"
```

## Task 3: Render Publications on the Articles Page

**Files:**
- Modify: `src/app/articles/page.tsx`

- [ ] **Step 1: Update the articles page**

Replace `src/app/articles/page.tsx` with:

```tsx
import { Articles } from '@components/List/Articles'
import { Publications } from '@components/List/Publications'
import { MotionSection } from '@/components/MotionSection'

const ArticlesPage = () => {
  return (
    <MotionSection className="space-y-10" delayIndex={0}>
      <div className="flex items-baseline justify-between border-b pb-2">
        <h3 className="text-2xl font-semibold tracking-tight">WRITING & PUBLICATIONS</h3>
      </div>

      <section className="space-y-4">
        <h4 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          Writing Platforms
        </h4>
        <Articles />
      </section>

      <section className="space-y-4">
        <h4 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
          Publications
        </h4>
        <Publications />
      </section>
    </MotionSection>
  )
}

export default ArticlesPage
```

- [ ] **Step 2: Run focused tests**

Run:

```bash
bun test src/content/content-modules.test.ts
```

Expected result: all tests in `src/content/content-modules.test.ts` pass.

- [ ] **Step 3: Run lint**

Run:

```bash
bun run lint
```

Expected result: ESLint exits successfully.

- [ ] **Step 4: Build the app**

Run:

```bash
bun run build
```

Expected result: Next.js production build completes successfully.

- [ ] **Step 5: Manually verify the page**

Run:

```bash
bun dev
```

Open `http://localhost:3000/articles` and verify:

- The page heading is `WRITING & PUBLICATIONS`.
- Existing article platform cards still render.
- A `Publications` section appears below the writing platform cards.
- The book card displays `Kubernetesで実践する Platform Engineering`.
- The visible role label is `Translation review contribution`.
- The visible text does not call Yugo a translator.
- The visible text does not mention a company name.
- The book card opens `https://www.shoeisha.co.jp/book/detail/9784798188379` in a new tab.
- The layout works at desktop width and mobile width.

- [ ] **Step 6: Commit Task 3**

Run:

```bash
git add src/app/articles/page.tsx
git commit -m "feat: show publications on articles page"
```

## Final Verification

- [ ] **Step 1: Confirm only portfolio files changed**

Run:

```bash
git status --short
```

Expected result: changed files are only under `/Users/yugo/ghq/github.com/yugo-ibuki/portfolio`.

- [ ] **Step 2: Run full test suite**

Run:

```bash
bun test
```

Expected result: all tests pass.

- [ ] **Step 3: Run lint**

Run:

```bash
bun run lint
```

Expected result: ESLint exits successfully.

- [ ] **Step 4: Run production build**

Run:

```bash
bun run build
```

Expected result: Next.js production build completes successfully.

## Acceptance Criteria

- `/articles` shows a publication contribution for `Kubernetesで実践する Platform Engineering`.
- The role is shown as `Translation review contribution`.
- The visible portfolio text does not say `Translator`.
- The visible portfolio text does not mention a company name.
- The book links to `https://www.shoeisha.co.jp/book/detail/9784798188379`.
- No new sidebar navigation item is added.
- The existing article platform cards remain visible.
- `bun test`, `bun run lint`, and `bun run build` complete successfully.

## Notes for the Implementer

- This is a portfolio change, not a resume change.
- Keep the entry separate from `works`, because this is not a product/project portfolio item.
- Keep the entry separate from `presentations`, because this is not a talk.
- Use the existing card/list style from `Articles` and `Presentations` for consistency.
