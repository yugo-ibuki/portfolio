import { expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { SideWorkReferences } from './SideWorkReferences'

test('does not render a border or any markup when there are no references', () => {
  expect(renderToStaticMarkup(<SideWorkReferences references={[]} />)).toBe('')
})
