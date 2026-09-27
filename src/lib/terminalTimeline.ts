export const TERMINAL_TYPE_MS = 50
export const TERMINAL_PAUSE_MS = 300
export const TERMINAL_ITEM_MS = 40

export type TerminalFrame = {
  typedChars: number
  visibleItems: number
  retypedChars: number
  isDone: boolean
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getPhaseStarts = (commandLength: number, itemCount: number) => {
  const outputStart = commandLength * TERMINAL_TYPE_MS + TERMINAL_PAUSE_MS
  const retypeStart = outputStart + itemCount * TERMINAL_ITEM_MS + TERMINAL_PAUSE_MS

  return { outputStart, retypeStart }
}

export const getTerminalDuration = (commandLength: number, itemCount: number) =>
  getPhaseStarts(commandLength, itemCount).retypeStart + commandLength * TERMINAL_TYPE_MS

// 再生開始からの経過時間に対して、入力済みの文字数・表示済みの項目数・
// 次のプロンプトに再入力済みの文字数を返す
export const getTerminalFrame = (
  elapsedMs: number,
  commandLength: number,
  itemCount: number
): TerminalFrame => {
  const { outputStart, retypeStart } = getPhaseStarts(commandLength, itemCount)
  const countSince = (start: number, stepMs: number, max: number) =>
    elapsedMs < start ? 0 : clamp(Math.floor((elapsedMs - start) / stepMs), 0, max)

  return {
    typedChars: countSince(0, TERMINAL_TYPE_MS, commandLength),
    visibleItems:
      elapsedMs < outputStart ? 0 : countSince(outputStart, TERMINAL_ITEM_MS, itemCount - 1) + 1,
    retypedChars: countSince(retypeStart, TERMINAL_TYPE_MS, commandLength),
    isDone: elapsedMs >= getTerminalDuration(commandLength, itemCount),
  }
}
