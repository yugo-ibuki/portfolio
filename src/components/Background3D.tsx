'use client'

import { useEffect, useRef } from 'react'
import type * as Three from 'three'

type Background3DProps = {
  className?: string
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
    let faceMaterial: Three.MeshStandardMaterial | null = null
    let edgeMaterial: Three.LineBasicMaterial | null = null
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
      faceMaterial = new THREE.MeshStandardMaterial({
        color: 0x171717,
        flatShading: true,
        metalness: 0.05,
        opacity: 0.12,
        roughness: 0.82,
        side: THREE.DoubleSide,
        transparent: true,
      })
      edgeMaterial = new THREE.LineBasicMaterial({
        color: 0x171717,
        opacity: 0.72,
        transparent: true,
      })

      const solid = new THREE.Mesh(geometry, faceMaterial)
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
      const tetrahedron = new THREE.Group()
      tetrahedron.add(solid, edges)
      tetrahedron.rotation.set(-0.36, 0.58, 0.08)
      scene.add(tetrahedron)

      scene.add(new THREE.HemisphereLight(0xffffff, 0x6b7280, 1.6))
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
      directionalLight.position.set(3, 4, 5)
      scene.add(directionalLight)

      const updateTheme = () => {
        const foregroundColor = window.getComputedStyle(mountElement).color
        faceMaterial?.color.setStyle(foregroundColor)
        edgeMaterial?.color.setStyle(foregroundColor)
      }

      const resize = () => {
        const width = Math.max(mountElement.clientWidth, 1)
        const height = Math.max(mountElement.clientHeight, 1)
        const isMobile = width < MOBILE_BREAKPOINT

        camera.aspect = width / height
        camera.updateProjectionMatrix()
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
          tetrahedron.rotation.x += elapsedSeconds * 0.16
          tetrahedron.rotation.y += elapsedSeconds * 0.25
          webglRenderer.render(scene, camera)
        }

        animationFrame = window.requestAnimationFrame(animate)
      }

      const updateAnimation = () => {
        const shouldAnimate = !isReducedMotion && isHeroVisible && !document.hidden

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
      faceMaterial?.dispose()
      edgeMaterial?.dispose()
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
