import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { works } from '@/content/works'

describe('Work', () => {
  test('renders every project in the editorial layout', async () => {
    const { Work } = await import('./Work')
    const markup = renderToStaticMarkup(<Work />)
    document.body.innerHTML = markup

    expect(markup).toContain('data-work-layout="editorial"')

    for (const work of works) {
      expect(document.body.textContent).toContain(work.name)
      expect(document.body.textContent).toContain(work.description)
      expect(document.querySelector(`a[href="${work.url}"]`)).not.toBeNull()
      const image = document.querySelector(`img[src="${work.photo}"]`)
      expect(image?.getAttribute('alt')).toBe(work.name)
      expect(image?.getAttribute('width')).toBe('800')
      expect(image?.getAttribute('height')).toBe('500')
      expect(image?.getAttribute('loading')).toBe(work === works[0] ? 'eager' : 'lazy')
    }
  })
})
