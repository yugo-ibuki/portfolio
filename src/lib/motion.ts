export const PAGE_TRANSITION_DURATION_MS = 220
export const SECTION_TRANSITION_DURATION_MS = 420
export const SECTION_DELAY_STEP_MS = 70
export const SECTION_DELAY_MAX_MS = 210

type BackgroundMotionConfig = {
  motionMultiplier: number
  floatXAmplitude: number
  floatYAmplitude: number
  scaleAmplitude: number
  opacityAmplitude: number
  cameraXAmplitude: number
  cameraYAmplitude: number
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

export const getRevealDelay = (index: number) => {
  return clamp(index * SECTION_DELAY_STEP_MS, 0, SECTION_DELAY_MAX_MS)
}

export const getProgressDuration = (value: number) => {
  return clamp(260 + Math.round(value * 4), 260, 620)
}

export const getBackgroundMotionConfig = (
  prefersReducedMotion: boolean
): BackgroundMotionConfig => {
  if (prefersReducedMotion) {
    return {
      motionMultiplier: 0.2,
      floatXAmplitude: 0.12,
      floatYAmplitude: 0.2,
      scaleAmplitude: 0.02,
      opacityAmplitude: 0.03,
      cameraXAmplitude: 0,
      cameraYAmplitude: 0,
    }
  }

  return {
    motionMultiplier: 0.55,
    floatXAmplitude: 0.4,
    floatYAmplitude: 0.7,
    scaleAmplitude: 0.07,
    opacityAmplitude: 0.06,
    cameraXAmplitude: 0.18,
    cameraYAmplitude: 0.12,
  }
}
