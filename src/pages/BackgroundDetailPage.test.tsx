import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { getBackgroundDetail } from '@/lib/getBackgroundDetail'
import BackgroundDetailPage from './BackgroundDetailPage'

describe('background detail page', () => {
  test.each(['english_mentor', 'programming_mentor', 'programming_mentor_2'])(
    'renders the content for %s',
    (name) => {
      const data = getBackgroundDetail(name)
      const markup = renderToStaticMarkup(<BackgroundDetailPage data={data} />)
      document.body.innerHTML = markup
      expect(document.querySelector('h1')?.textContent).toBe(data.title)
      for (const paragraph of data.description) {
        expect(document.body.textContent).toContain(paragraph)
      }
    }
  )

  test('rejects an unknown slug as not found', () => {
    expect(() => getBackgroundDetail('does-not-exist')).toThrow()
    try {
      getBackgroundDetail('does-not-exist')
    } catch (error) {
      expect(error).toMatchObject({ isNotFound: true })
    }
  })
})
