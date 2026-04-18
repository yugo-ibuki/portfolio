import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import type { ReactNode } from 'react'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { Contribution } from './types'

type GitContributionState = {
  isLoading: boolean
  error: string | null
  contributions: Contribution[]
}

type CalendarDay = {
  date: string
  count: number
  dayOfWeek: number
  weekNumber: number
}

type CalendarState = {
  totalWeeks: number
  calendarData: Record<string, CalendarDay>
}

const hookState: {
  gitContribution: GitContributionState
  calendar: CalendarState
} = {
  gitContribution: {
    isLoading: false,
    error: null,
    contributions: [],
  },
  calendar: {
    totalWeeks: 2,
    calendarData: {},
  },
}

mock.module('./useGitContributions', () => ({
  useGitContributions: () => hookState.gitContribution,
}))

mock.module('./model', () => ({
  buildContributionCalendar: () => hookState.calendar,
}))

mock.module('@/components/components/ui/spinner', () => ({
  Spinner: () => <div data-spinner="true" />,
}))

mock.module('@/components/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  Tooltip: ({ children }: { children: ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  TooltipContent: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

const allowedDirections = new Set(['up', 'down', 'left', 'right'])
const domEnvironmentError =
  'GitContribution tests require a DOM environment. Configure bun test with happy-dom preload before running them.'

const createLoadedCalendarState = (): CalendarState => ({
  totalWeeks: 2,
  calendarData: {
    '0-0': {
      date: '2026-04-01',
      count: 3,
      dayOfWeek: 0,
      weekNumber: 0,
    },
    '0-1': {
      date: '2026-04-02',
      count: 0,
      dayOfWeek: 1,
      weekNumber: 0,
    },
    '1-2': {
      date: '2026-04-09',
      count: 8,
      dayOfWeek: 2,
      weekNumber: 1,
    },
  },
})

const setLoadedState = () => {
  hookState.gitContribution = {
    isLoading: false,
    error: null,
    contributions: [
      { date: '2026-04-01', count: 3 },
      { date: '2026-04-02', count: 0 },
      { date: '2026-04-09', count: 8 },
    ],
  }
  hookState.calendar = createLoadedCalendarState()
}

const queryGrid = (container: HTMLElement) => {
  const grid = Array.from(container.querySelectorAll<HTMLElement>('div')).find(
    (element) => element.style.getPropertyValue('--contribution-animation-duration') === '3000ms'
  )

  if (!grid) {
    throw new Error('Contribution grid is missing the animation duration contract')
  }

  return grid
}

const queryAnimatedCells = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>('[data-direction]'))

const ensureDomEnvironment = () => {
  if (typeof document === 'undefined') {
    throw new Error(domEnvironmentError)
  }
}

let mountedRoot: Root | null = null
let mountedContainer: HTMLDivElement | null = null
let GitContribution: (() => ReactNode) | null = null

type ObserverRecord = {
  callback: IntersectionObserverCallback
  observedElements: Element[]
}

const observerRecords: ObserverRecord[] = []

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = [0]
  private readonly record: ObserverRecord

  constructor(callback: IntersectionObserverCallback) {
    this.record = {
      callback,
      observedElements: [],
    }
    observerRecords.push(this.record)
  }

  disconnect() {
    this.record.observedElements.length = 0
  }

  observe(target: Element) {
    this.record.observedElements.push(target)
  }

  takeRecords() {
    return []
  }

  unobserve(target: Element) {
    this.record.observedElements = this.record.observedElements.filter(
      (element) => element !== target
    )
  }
}

const triggerIntersection = async (isIntersecting: boolean) => {
  const [record] = observerRecords

  if (!record) {
    throw new Error('IntersectionObserver was not registered')
  }

  const [target] = record.observedElements

  if (!target) {
    throw new Error('No element is being observed')
  }

  await act(async () => {
    record.callback(
      [
        {
          isIntersecting,
          target,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    )
  })
}

const renderGitContribution = async () => {
  ensureDomEnvironment()

  if (!GitContribution) {
    const featureModule = await import('./GitContribution')
    GitContribution = featureModule.GitContribution
  }

  mountedContainer = document.createElement('div')
  document.body.appendChild(mountedContainer)
  mountedRoot = createRoot(mountedContainer)

  await act(async () => {
    if (!GitContribution) {
      throw new Error('GitContribution component was not loaded')
    }

    mountedRoot?.render(<GitContribution />)
  })

  return mountedContainer
}

beforeEach(() => {
  hookState.gitContribution = {
    isLoading: false,
    error: null,
    contributions: [],
  }
  hookState.calendar = {
    totalWeeks: 2,
    calendarData: {},
  }
  observerRecords.length = 0
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver
})

afterEach(async () => {
  if (mountedRoot) {
    await act(async () => {
      mountedRoot?.unmount()
    })
  }

  mountedContainer?.remove()
  mountedRoot = null
  mountedContainer = null
  observerRecords.length = 0
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
  }
})

describe('GitContribution', () => {
  it('shows the loading indicator while contribution data is loading', async () => {
    hookState.gitContribution = {
      isLoading: true,
      error: null,
      contributions: [],
    }

    const container = await renderGitContribution()

    expect(container.querySelector('[data-spinner="true"]') !== null).toBe(true)
  })

  it('shows the existing error message when contribution loading fails', async () => {
    hookState.gitContribution = {
      isLoading: false,
      error: 'Failed to fetch GitHub contributions',
      contributions: [],
    }

    const container = await renderGitContribution()

    expect(container.textContent?.includes('エラーになりました。')).toBe(true)
  })

  it('assigns a direction and a 3000ms animation contract to every grid cell', async () => {
    setLoadedState()

    const container = await renderGitContribution()
    const grid = queryGrid(container)
    const cells = queryAnimatedCells(container)

    expect(grid.style.getPropertyValue('--contribution-animation-duration')).toBe('3000ms')
    expect(cells.length).toBe(14)

    cells.forEach((cell) => {
      expect(allowedDirections.has(cell.dataset.direction ?? '')).toBe(true)
      expect(cell.getAttribute('data-animate')).toBe('idle')
    })
  })

  it('switches cells into the running animation state when the grid enters the viewport', async () => {
    setLoadedState()

    const container = await renderGitContribution()

    await triggerIntersection(true)

    const cells = queryAnimatedCells(container)

    cells.forEach((cell) => {
      expect(cell.getAttribute('data-animate')).toBe('running')
    })
  })

  it('restarts the animation when the grid leaves and enters the viewport again', async () => {
    setLoadedState()

    const container = await renderGitContribution()
    queryGrid(container)

    await triggerIntersection(true)
    await triggerIntersection(false)

    queryAnimatedCells(container).forEach((cell) => {
      expect(cell.getAttribute('data-animate')).toBe('idle')
    })

    await triggerIntersection(true)

    const cells = queryAnimatedCells(container)

    cells.forEach((cell) => {
      expect(cell.getAttribute('data-animate')).toBe('running')
    })
  })
})
