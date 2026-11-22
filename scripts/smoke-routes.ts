import assert from 'node:assert/strict'

const baseUrl = new URL(process.argv[2] ?? 'http://127.0.0.1:3000')

for (const [source, destination] of [
  ['/presentation', '/articles'],
  ['/contact', '/'],
]) {
  const url = new URL(`${source}?ref=legacy`, baseUrl)
  const response = await fetch(url, { redirect: 'manual' })
  assert.equal(response.status, 308, source)
  const location = response.headers.get('location')
  assert.ok(location, `${source}: missing Location header`)
  assert.equal(new URL(location, url).href, new URL(`${destination}?ref=legacy`, baseUrl).href)
  console.log(`${source}: 308 → ${location}`)
}

for (const path of ['/does-not-exist', '/background/does-not-exist']) {
  const response = await fetch(new URL(path, baseUrl))
  assert.equal(response.status, 404, path)
  const html = await response.text()
  assert.match(html, /<header[\s>]/, path)
  assert.match(html, /<footer[\s>]/, path)
  assert.match(html, /<a\b[^>]*\bhref="\/"[^>]*>Back to home<\/a>/, path)
  console.log(`${path}: 404 with navigation`)
}

const detail = await fetch(new URL('/background/programming_mentor_2', baseUrl))
assert.equal(detail.status, 200)
assert.equal((await detail.text()).match(/<main[\s>]/g)?.length, 1)
console.log('/background/programming_mentor_2: 200 with one main landmark')
