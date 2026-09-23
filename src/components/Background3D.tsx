'use client'

import { useEffect, useRef } from 'react'
import type * as Three from 'three'

type Background3DProps = {
  className?: string
}

type RotatingTetrahedron = {
  basePosition: Three.Vector3
  drift: {
    phase: number
    speed: number
    xPixels: number
    yPixels: number
  }
  group: Three.Group
  rotationSpeed: {
    x: number
    y: number
    z: number
  }
}

const MOBILE_BREAKPOINT = 640
const MOBILE_FRAME_RATE = 30
const DESKTOP_FRAME_RATE = 48

export default function Background3D({ className = '' }: Background3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mountElement = mountRef.current

    if (!mountElement) {
      return
    }

    let animationFrame = 0
    let renderer: Three.WebGLRenderer | null = null
    let geometry: Three.TetrahedronGeometry | null = null
    let edgeGeometry: Three.EdgesGeometry | null = null
    const faceMaterials: Three.MeshStandardMaterial[] = []
    const edgeMaterials: Three.LineBasicMaterial[] = []
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let themeObserver: MutationObserver | null = null
    let isDisposed = false
    let isHeroVisible = true
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const initThree = async () => {
      const THREE = await import('three')

      if (isDisposed) {
        return
      }

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.set(0, 0.1, 5.2)

      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: window.innerWidth >= MOBILE_BREAKPOINT,
          powerPreference: 'low-power',
        })
      } catch {
        return
      }

      const webglRenderer = renderer
      webglRenderer.setClearColor(0x000000, 0)
      webglRenderer.outputColorSpace = THREE.SRGBColorSpace
      webglRenderer.domElement.setAttribute('role', 'presentation')
      mountElement.appendChild(webglRenderer.domElement)

      geometry = new THREE.TetrahedronGeometry(1.72, 0)
      edgeGeometry = new THREE.EdgesGeometry(geometry)
      const sharedGeometry = geometry
      const sharedEdgeGeometry = edgeGeometry

      const createTetrahedron = ({
        edgeOpacity,
        faceOpacity,
        drift,
        position,
        rotation,
        rotationSpeed,
        scale,
      }: {
        edgeOpacity: number
        faceOpacity: number
        drift: RotatingTetrahedron['drift']
        position: [number, number, number]
        rotation: [number, number, number]
        rotationSpeed: RotatingTetrahedron['rotationSpeed']
        scale: number
      }): RotatingTetrahedron => {
        const faceMaterial = new THREE.MeshStandardMaterial({
          color: 0x171717,
          flatShading: true,
          metalness: 0.05,
          opacity: faceOpacity,
          roughness: 0.82,
          side: THREE.DoubleSide,
          transparent: true,
        })
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: 0x171717,
          opacity: edgeOpacity,
          transparent: true,
        })
        const solid = new THREE.Mesh(sharedGeometry, faceMaterial)
        const edges = new THREE.LineSegments(sharedEdgeGeometry, edgeMaterial)
        const group = new THREE.Group()

        faceMaterials.push(faceMaterial)
        edgeMaterials.push(edgeMaterial)
        group.add(solid, edges)
        group.position.set(...position)
        group.rotation.set(...rotation)
        group.scale.setScalar(scale)
        scene.add(group)

        return { basePosition: group.position.clone(), drift, group, rotationSpeed }
      }

      const tetrahedra = [
        createTetrahedron({
          drift: { phase: 0.4, speed: 0.28, xPixels: 10, yPixels: 7 },
          edgeOpacity: 0.72,
          faceOpacity: 0.12,
          position: [0, 0, 0],
          rotation: [-0.36, 0.58, 0.08],
          rotationSpeed: { x: 0.16, y: 0.25, z: 0 },
          scale: 1,
        }),
        createTetrahedron({
          drift: { phase: 2.1, speed: 0.22, xPixels: 16, yPixels: 10 },
          edgeOpacity: 0.56,
          faceOpacity: 0.085,
          position: [0, 0, 0.35],
          rotation: [0.52, -0.28, 0.34],
          rotationSpeed: { x: -0.22, y: 0.32, z: 0.08 },
          scale: 0.34,
        }),
        createTetrahedron({
          drift: { phase: 4.3, speed: 0.25, xPixels: 12, yPixels: 14 },
          edgeOpacity: 0.4,
          faceOpacity: 0.055,
          position: [0, 0, 0.38],
          rotation: [-0.18, 0.92, -0.38],
          rotationSpeed: { x: 0.26, y: -0.2, z: -0.1 },
          scale: 0.27,
        }),
      ]

      scene.add(new THREE.HemisphereLight(0xffffff, 0x6b7280, 1.6))
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
      directionalLight.position.set(3, 4, 5)
      scene.add(directionalLight)

      const updateTheme = () => {
        const foregroundColor = window.getComputedStyle(mountElement).color
        faceMaterials.forEach((material) => material.color.setStyle(foregroundColor))
        edgeMaterials.forEach((material) => material.color.setStyle(foregroundColor))
      }

      const resize = () => {
        const width = Math.max(mountElement.clientWidth, 1)
        const height = Math.max(mountElement.clientHeight, 1)
        const isMobile = width < MOBILE_BREAKPOINT
        const heroGrid = mountElement.parentElement?.querySelector<HTMLElement>('[data-hero-grid]')
        const heroVisual = heroGrid?.querySelector<HTMLElement>('.hero-visual')
        const portrait = heroGrid?.querySelector<HTMLElement>('.hero-portrait')

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        if (heroGrid && heroVisual && portrait) {
          const mountRect = mountElement.getBoundingClientRect()
          const gridRect = heroGrid.getBoundingClientRect()
          const visualRect = heroVisual.getBoundingClientRect()
          const portraitRect = portrait.getBoundingClientRect()
          const headerBottom = Array.from(document.querySelectorAll<HTMLElement>('header')).reduce(
            (bottom, header) => Math.max(bottom, header.getBoundingClientRect().bottom),
            0
          )
          const viewportWidth = window.innerWidth
          const isUltraWide = viewportWidth >= 2560
          const isDesktop = viewportWidth >= 1024
          const isTablet = viewportWidth >= 768
          const isSmallTablet = viewportWidth >= 640
          const previousCanvasHeight = isUltraWide
            ? 416
            : isDesktop
              ? 368
              : isTablet
                ? 328
                : isSmallTablet
                  ? 288
                  : 248
          const mainOffsetX = isUltraWide ? 20 : isDesktop ? 4 : -12
          const mainOffsetY = isUltraWide
            ? 64
            : isDesktop
              ? 40
              : isTablet
                ? 20
                : isSmallTablet
                  ? 16
                  : 8
          const mainTarget = {
            x: portraitRect.left - mountRect.left + mainOffsetX,
            y: portraitRect.top - mountRect.top + mainOffsetY,
          }
          const topTarget = isTablet
            ? {
                x: gridRect.left - mountRect.left + gridRect.width * 0.48,
                y: Math.max(
                  gridRect.top - mountRect.top + gridRect.height * 0.15,
                  headerBottom - mountRect.top + 72
                ),
              }
            : {
                x: visualRect.left - mountRect.left + visualRect.width * 0.78,
                y: visualRect.top - mountRect.top + visualRect.height * 0.16,
              }
          const lowerTarget = isTablet
            ? {
                x: gridRect.left - mountRect.left + gridRect.width * 0.12,
                y: gridRect.top - mountRect.top + gridRect.height * 0.8,
              }
            : {
                x: visualRect.left - mountRect.left + visualRect.width * 0.18,
                y: visualRect.top - mountRect.top + visualRect.height * 0.82,
              }
          const toWorldPosition = (point: { x: number; y: number }, z: number) => {
            const visibleHeight =
              2 * (camera.position.z - z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))

            return {
              x: ((point.x - width / 2) / height) * visibleHeight,
              y: ((height / 2 - point.y) / height) * visibleHeight,
            }
          }
          const mainPosition = toWorldPosition(mainTarget, 0)
          const topPosition = toWorldPosition(topTarget, 0.35)
          const lowerPosition = toWorldPosition(lowerTarget, 0.38)
          const mainScale = (previousCanvasHeight / height) * 0.62
          const topScaleRatio = isTablet ? 0.34 : 0.44
          const lowerScaleRatio = isTablet ? 0.28 : 0.38

          tetrahedra[0].group.position.set(mainPosition.x, mainPosition.y, 0)
          tetrahedra[0].basePosition.copy(tetrahedra[0].group.position)
          tetrahedra[0].group.scale.setScalar(mainScale)
          tetrahedra[1].group.position.set(topPosition.x, topPosition.y, 0.35)
          tetrahedra[1].basePosition.copy(tetrahedra[1].group.position)
          tetrahedra[1].group.scale.setScalar(mainScale * topScaleRatio)
          tetrahedra[2].group.position.set(lowerPosition.x, lowerPosition.y, 0.38)
          tetrahedra[2].basePosition.copy(tetrahedra[2].group.position)
          tetrahedra[2].group.scale.setScalar(mainScale * lowerScaleRatio)
        }

        webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5))
        webglRenderer.setSize(width, height, false)
        webglRenderer.render(scene, camera)
      }

      let previousFrameTime = 0
      const animate = (currentTime: number) => {
        animationFrame = 0

        if (isDisposed || isReducedMotion || !isHeroVisible || document.hidden) {
          return
        }

        const targetFrameRate =
          mountElement.clientWidth < MOBILE_BREAKPOINT ? MOBILE_FRAME_RATE : DESKTOP_FRAME_RATE
        const frameInterval = 1000 / targetFrameRate

        if (currentTime - previousFrameTime >= frameInterval) {
          const elapsedSeconds =
            previousFrameTime === 0
              ? frameInterval / 1000
              : Math.min((currentTime - previousFrameTime) / 1000, 0.1)

          previousFrameTime = currentTime
          const timeSeconds = currentTime * 0.001

          tetrahedra.forEach(({ basePosition, drift, group, rotationSpeed }) => {
            group.rotation.x += elapsedSeconds * rotationSpeed.x
            group.rotation.y += elapsedSeconds * rotationSpeed.y
            group.rotation.z += elapsedSeconds * rotationSpeed.z

            const visibleHeight =
              2 *
              (camera.position.z - basePosition.z) *
              Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
            const worldPerPixel = visibleHeight / Math.max(mountElement.clientHeight, 1)
            const driftTime = timeSeconds * drift.speed + drift.phase

            group.position.x = basePosition.x + Math.cos(driftTime) * drift.xPixels * worldPerPixel
            group.position.y =
              basePosition.y + Math.sin(driftTime * 0.82) * drift.yPixels * worldPerPixel
          })
          webglRenderer.render(scene, camera)
        }

        animationFrame = window.requestAnimationFrame(animate)
      }

      const updateAnimation = () => {
        const shouldAnimate = !isReducedMotion && isHeroVisible && !document.hidden

        if (isReducedMotion) {
          tetrahedra.forEach(({ basePosition, group }) => group.position.copy(basePosition))
        }

        if (shouldAnimate && animationFrame === 0) {
          previousFrameTime = 0
          animationFrame = window.requestAnimationFrame(animate)
        } else if (!shouldAnimate && animationFrame !== 0) {
          window.cancelAnimationFrame(animationFrame)
          animationFrame = 0
        }

        if (!shouldAnimate) {
          webglRenderer.render(scene, camera)
        }
      }

      const handleVisibilityChange = () => {
        updateAnimation()
      }

      const handleReducedMotionChange = (event: MediaQueryListEvent) => {
        isReducedMotion = event.matches
        updateAnimation()
      }

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(mountElement)

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isHeroVisible = entry.isIntersecting
          updateAnimation()
        },
        { threshold: 0.01 }
      )
      intersectionObserver.observe(mountElement)

      themeObserver = new MutationObserver(() => {
        updateTheme()
        webglRenderer.render(scene, camera)
      })
      themeObserver.observe(document.documentElement, {
        attributeFilter: ['class'],
        attributes: true,
      })

      document.addEventListener('visibilitychange', handleVisibilityChange)
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
      updateTheme()
      resize()
      updateAnimation()

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      }
    }

    let removeEventListeners: (() => void) | undefined
    void initThree().then((cleanup) => {
      if (isDisposed) {
        cleanup?.()
        return
      }

      removeEventListeners = cleanup
    })

    return () => {
      isDisposed = true
      window.cancelAnimationFrame(animationFrame)
      removeEventListeners?.()
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      themeObserver?.disconnect()
      faceMaterials.forEach((material) => material.dispose())
      edgeMaterials.forEach((material) => material.dispose())
      edgeGeometry?.dispose()
      geometry?.dispose()

      if (renderer) {
        if (mountElement.contains(renderer.domElement)) {
          mountElement.removeChild(renderer.domElement)
        }

        renderer.dispose()
        renderer.forceContextLoss()
      }
    }
  }, [])

  return (
    <div ref={mountRef} aria-hidden="true" className={`pointer-events-none ${className}`.trim()} />
  )
}
