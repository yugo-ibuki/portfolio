import { describe, expect, test } from 'bun:test'
import {
  getBackgroundMotionConfig,
  getProgressDuration,
  getRevealDelay,
  SECTION_DELAY_MAX_MS,
  SECTION_DELAY_STEP_MS,
} from './motion'

describe('getRevealDelay', () => {
  test('returns a stepped delay for early sections', () => {
    expect(getRevealDelay(0)).toBe(0)
    expect(getRevealDelay(2)).toBe(SECTION_DELAY_STEP_MS * 2)
  })

  test('caps the delay for later sections', () => {
    expect(getRevealDelay(99)).toBe(SECTION_DELAY_MAX_MS)
  })
})

describe('getProgressDuration', () => {
  test('keeps low values at the minimum duration', () => {
    expect(getProgressDuration(0)).toBe(260)
    expect(getProgressDuration(10)).toBe(300)
  })

  test('caps high values at the maximum duration', () => {
    expect(getProgressDuration(100)).toBe(620)
    expect(getProgressDuration(180)).toBe(620)
  })
})

describe('getBackgroundMotionConfig', () => {
  test('returns a restrained config for reduced motion', () => {
    const config = getBackgroundMotionConfig(true)

    expect(config.motionMultiplier).toBeLessThan(0.3)
    expect(config.cameraXAmplitude).toBe(0)
    expect(config.cameraYAmplitude).toBe(0)
  })

  test('returns a subtle animated config by default', () => {
    const config = getBackgroundMotionConfig(false)

    expect(config.motionMultiplier).toBe(0.55)
    expect(config.floatYAmplitude).toBeGreaterThan(config.floatXAmplitude)
    expect(config.scaleAmplitude).toBeGreaterThan(0)
  })
})
