import { describe, expect, test } from 'bun:test'
import {
  getTerminalFrame,
  getTerminalDuration,
  TERMINAL_ITEM_MS,
  TERMINAL_PAUSE_MS,
  TERMINAL_TYPE_MS,
} from './terminalTimeline'

const command = 'ls --skill'
const itemCount = 5
const typingEnd = command.length * TERMINAL_TYPE_MS
const outputStart = typingEnd + TERMINAL_PAUSE_MS
const retypeStart = outputStart + itemCount * TERMINAL_ITEM_MS + TERMINAL_PAUSE_MS

describe('getTerminalFrame', () => {
  test('shows nothing at the start', () => {
    expect(getTerminalFrame(0, command.length, itemCount)).toEqual({
      typedChars: 0,
      visibleItems: 0,
      retypedChars: 0,
      isDone: false,
    })
  })

  test('types the command one character at a time', () => {
    expect(getTerminalFrame(TERMINAL_TYPE_MS * 3, command.length, itemCount).typedChars).toBe(3)
  })

  test('waits after typing before showing output', () => {
    const frame = getTerminalFrame(typingEnd + TERMINAL_PAUSE_MS - 1, command.length, itemCount)

    expect(frame.typedChars).toBe(command.length)
    expect(frame.visibleItems).toBe(0)
  })

  test('reveals output items one by one', () => {
    expect(getTerminalFrame(outputStart, command.length, itemCount).visibleItems).toBe(1)
    expect(
      getTerminalFrame(outputStart + TERMINAL_ITEM_MS * 2, command.length, itemCount).visibleItems
    ).toBe(3)
  })

  test('types the command again on the next prompt after the output', () => {
    expect(getTerminalFrame(retypeStart - 1, command.length, itemCount).retypedChars).toBe(0)
    expect(
      getTerminalFrame(retypeStart + TERMINAL_TYPE_MS * 4, command.length, itemCount).retypedChars
    ).toBe(4)
  })

  test('stops at the final state after the timeline ends', () => {
    const end = getTerminalDuration(command.length, itemCount)

    expect(getTerminalFrame(end + 10_000, command.length, itemCount)).toEqual({
      typedChars: command.length,
      visibleItems: itemCount,
      retypedChars: command.length,
      isDone: true,
    })
  })
})
