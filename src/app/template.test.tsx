import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import Template from './template'

describe('Template', () => {
  test('wraps route content with the page transition class', () => {
    const markup = renderToStaticMarkup(
      <Template>
        <span>page</span>
      </Template>
    )

    expect(markup).toContain('motion-page-enter')
    expect(markup).toContain('<span>page</span>')
  })
})
