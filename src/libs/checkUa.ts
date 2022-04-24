import type { NextPageContext } from 'next'

export const checkUa = (req: NextPageContext['req']): string => {
  // https://scrapbox.io/terfno/Next.js_%E3%81%A7%E3%83%87%E3%83%90%E3%82%A4%E3%82%B9%E3%82%92%E5%88%A4%E5%88%A5%E3%81%97%E3%81%9F%E3%81%84
  let ua = 'other'
  if (req && req.headers['user-agent']) {
    ua = /Android/.test(req.headers['user-agent'])
      // Android判定
      ? 'Android'
      : /iOS/.test(req.headers['user-agent'])
        // iOS判定
        ? 'iOS'
        : 'other'
  }
  return ua
}