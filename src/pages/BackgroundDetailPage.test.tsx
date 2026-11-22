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
      expect(document.querySelector(`a[href="${data.officialSiteUrl}"]`)?.textContent).toBe(
        'Official site'
      )
      for (const paragraph of data.description) {
        expect(document.body.textContent).toContain(paragraph)
      }
    }
  )

  test('renders Ficilcom without an official site or project cards', () => {
    const data = getBackgroundDetail('ficilcom')
    document.body.innerHTML = renderToStaticMarkup(<BackgroundDetailPage data={data} />)

    expect(document.querySelector('h1')?.textContent).toBe('Ficilcom')
    expect(document.body.textContent).toContain('I worked as a frontend engineer at Ficilcom.')
    expect(document.querySelector('a[target="_blank"], img')).toBeNull()
  })

  test('renders the TechTrain internship results and press release link', () => {
    const data = getBackgroundDetail('programming_mentor_2')
    document.body.innerHTML = renderToStaticMarkup(<BackgroundDetailPage data={data} />)

    expect(document.body.textContent).toContain('Musashino University')
    expect(document.body.textContent).not.toContain('スッシトレイン')
    expect(document.body.textContent).toContain('All 43 participants')
    expect(document.body.textContent).toContain('85%')
    const link = document.querySelector(
      'a[href="https://prtimes.jp/main/html/rd/p/000000254.000040741.html"]'
    )
    expect(link?.textContent).toContain('PR TIMES')
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  })

  test('renders AI adoption support and the Tokyo Total Consulting case study link', () => {
    const data = getBackgroundDetail('programming_mentor_2')
    document.body.innerHTML = renderToStaticMarkup(<BackgroundDetailPage data={data} />)

    expect(document.querySelector('section[aria-label="AI Consulting"]')?.textContent).toContain(
      'Tokyo Total Consulting'
    )
    expect(document.querySelector('section[aria-label="Workshop"]')?.textContent).toContain(
      'Musashino University'
    )
    expect(document.body.textContent).toContain('Tokyo Total Consulting')
    expect(document.body.textContent).toContain('three-session, five-hour')
    const link = document.querySelector(
      'a[href="https://business.techtrain.dev/training/case/ttc-genai-hands-on-3series"]'
    )
    expect(link?.textContent).toContain('TechTrain case study')
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  })

  test('renders both talks with English and Japanese titles under Public Speaking', () => {
    const data = getBackgroundDetail('programming_mentor_2')
    document.body.innerHTML = renderToStaticMarkup(<BackgroundDetailPage data={data} />)

    const section = document.querySelector('section[aria-label="Public Speaking"]')
    const meetup = section?.querySelector(
      'a[href="https://techtrain.dev/media/articles/hisvafpeq"]'
    )
    const circlet = section?.querySelector('a[href="https://news.nicovideo.jp/watch/nw18993291"]')
    expect(meetup?.textContent).toContain('Building real-time chat with Cloudflare Durable Objects')
    expect(meetup?.querySelector('[lang="ja"]')?.textContent).toBe(
      'Cloudflare Durable Objectsについて'
    )
    expect(circlet?.textContent).toContain('CircLeT 2026')
    expect(circlet?.textContent).toContain('authorization server with AI')
    expect(circlet?.querySelector('[lang="ja"]')?.textContent).toBe(
      '認可サーバ構築の裏話～AIを利用したイマドキアプローチ～'
    )
  })

  test('renders compact OGP thumbnails for all TechTrain references', () => {
    const data = getBackgroundDetail('programming_mentor_2')
    document.body.innerHTML = renderToStaticMarkup(<BackgroundDetailPage data={data} />)

    expect(data.references).toHaveLength(4)
    for (const reference of data.references ?? []) {
      const image = document.querySelector(`a[href="${reference.url}"] img`)
      expect(image?.getAttribute('src')).toBe(reference.thumbnail)
      expect(image?.getAttribute('width')).toBe('64')
      expect(image?.getAttribute('height')).toBe('36')
      expect(image?.getAttribute('alt')).toBe('')
      expect(image?.getAttribute('loading')).toBe('lazy')
    }
  })

  test('rejects an unknown slug as not found', () => {
    expect(() => getBackgroundDetail('does-not-exist')).toThrow()
    try {
      getBackgroundDetail('does-not-exist')
    } catch (error) {
      expect(error).toMatchObject({ isNotFound: true })
    }
  })
})
