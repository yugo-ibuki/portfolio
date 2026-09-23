import { describe, expect, mock, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import type { ImageProps } from 'next/image'
import { works } from '@/content/works'

mock.module('next/image', () => ({
  default: ({ alt, src }: ImageProps) => <span data-alt={alt} data-src={src.toString()} />,
}))

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
      expect(document.querySelector(`[data-src="${work.photo}"]`)).not.toBeNull()
    }
  })
})
