import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { MotionSection } from './MotionSection'

describe('MotionSection', () => {
  test('renders the reveal class and delay variable', () => {
    const markup = renderToStaticMarkup(
      <MotionSection className="space-y-6" delayIndex={2}>
        <div>content</div>
      </MotionSection>
    )

    expect(markup).toContain('motion-section-reveal')
    expect(markup).toContain('space-y-6')
    expect(markup).toContain('--motion-delay:140ms')
  })

  test('renders a custom element when requested', () => {
    const markup = renderToStaticMarkup(
      <MotionSection as="article">
        <div>content</div>
      </MotionSection>
    )

    expect(markup.startsWith('<article')).toBe(true)
  })
})
