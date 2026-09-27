import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { skills } from '@/content/skills'
import { Skill } from './Skill'

const allSkillNames = Object.values(skills).flatMap((group) => group.map((skill) => skill.name))

describe('Skill terminal', () => {
  test('includes every skill in the markup before playback', () => {
    const markup = renderToStaticMarkup(<Skill />)

    for (const name of allSkillNames) {
      expect(markup).toContain(name)
    }
    expect(markup).toContain('language/')
    expect(markup).toContain('aria-label="Technical skills"')
  })

  test('keeps output items hidden until playback starts', () => {
    const markup = renderToStaticMarkup(<Skill />)

    expect(markup).toContain('data-visible="false"')
    expect(markup).not.toContain('data-visible="true"')
  })

  describe('with reduced motion', () => {
    let container: HTMLDivElement
    let root: Root
    const originalMatchMedia = window.matchMedia

    beforeEach(() => {
      window.matchMedia = ((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      })) as unknown as typeof window.matchMedia
      container = document.createElement('div')
      document.body.appendChild(container)
      root = createRoot(container)
    })

    afterEach(() => {
      act(() => root.unmount())
      container.remove()
      window.matchMedia = originalMatchMedia
    })

    test('shows the final state immediately', () => {
      act(() => root.render(<Skill />))

      expect(container.querySelectorAll('[data-visible="false"]').length).toBe(0)
      expect(container.textContent).toContain('ls --skill')
    })

    test('pre-types the command on the last prompt so it can be re-run', () => {
      act(() => root.render(<Skill />))

      const rerun = container.querySelector<HTMLButtonElement>(
        'button[aria-label="Run ls --skill again"]'
      )
      expect(rerun?.textContent).toContain('ls --skill')
      expect(rerun?.disabled).toBe(false)
    })

    test('restarts playback from the beginning when the command is run again', () => {
      act(() => root.render(<Skill />))

      const rerun = container.querySelector<HTMLButtonElement>(
        'button[aria-label="Run ls --skill again"]'
      )
      act(() => rerun?.click())

      expect(container.querySelectorAll('[data-visible="true"]').length).toBe(0)
    })
  })
})
