'use client'

import { useEffect, useRef } from 'react'
import type * as Three from 'three'
import { getBackgroundMotionConfig } from '@/lib/motion'

type FloatingUserData = {
  rotationSpeed: {
    x: number
    y: number
    z: number
  }
  originalPosition: Three.Vector3
  floatOffset: number
  floatSpeed: number
  baseOpacity: number
}

type FloatingMesh = Three.Mesh<Three.BufferGeometry, Three.MeshBasicMaterial>

type Background3DProps = {
  className?: string
}

export default function Background3D({ className = '' }: Background3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const mountElement = mountRef.current

    if (!mountElement) {
      return
    }

    let renderer: Three.WebGLRenderer | null = null
    let handleResize: (() => void) | null = null
    const objects: FloatingMesh[] = []
    let geometries: Three.BufferGeometry[] = []
    let isDisposed = false

    const initThree = async () => {
      const THREE = await import('three')

      if (isDisposed) {
        return
      }

      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const config = getBackgroundMotionConfig(shouldReduceMotion)
      const isMobile = window.innerWidth < 768
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      })

      camera.position.set(0, 0, 8)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.5))
      renderer.setClearColor(0x000000, 0)
      mountElement.appendChild(renderer.domElement)

      geometries = [
        new THREE.OctahedronGeometry(1.2, 0),
        new THREE.IcosahedronGeometry(1.0, 0),
        new THREE.TetrahedronGeometry(1.4, 0),
        new THREE.DodecahedronGeometry(0.9, 0),
        new THREE.ConeGeometry(0.8, 1.8, 6),
        new THREE.CylinderGeometry(0.5, 0.9, 1.6, 8),
      ]
      const colorPalette = [
        new THREE.Color(0x6366f1),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0x3b82f6),
        new THREE.Color(0x06b6d4),
        new THREE.Color(0x10b981),
        new THREE.Color(0xf59e0b),
      ]
      const objectCount = isMobile ? 4 : 6

      for (let index = 0; index < objectCount; index += 1) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)]
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        const material = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.18 + Math.random() * 0.18,
        })
        const mesh = new THREE.Mesh<Three.BufferGeometry, Three.MeshBasicMaterial>(
          geometry,
          material
        )

        const angle = Math.random() * Math.PI * 2
        const radius = 4.8 + Math.random() * 4.5
        const x = Math.cos(angle) * radius
        const baseY = Math.sin(angle) * radius
        const y = baseY + (Math.random() - 0.5) * 2.4
        const z = (Math.random() - 0.5) * 3.5

        mesh.position.set(x, y, z)
        mesh.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.006,
            y: (Math.random() - 0.5) * 0.006,
            z: (Math.random() - 0.5) * 0.006,
          },
          originalPosition: mesh.position.clone(),
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.25 + Math.random() * 0.2,
          baseOpacity: material.opacity,
        } as FloatingUserData

        scene.add(mesh)
        objects.push(mesh)
      }

      let lastTime = 0
      const targetFPS = isMobile ? 30 : 48
      const frameInterval = 1000 / targetFPS

      const animate = (currentTime: number) => {
        frameRef.current = window.requestAnimationFrame(animate)

        if (currentTime - lastTime < frameInterval) {
          return
        }

        lastTime = currentTime

        const time = currentTime * 0.001

        objects.forEach((mesh, index) => {
          const { baseOpacity, floatOffset, floatSpeed, originalPosition, rotationSpeed } =
            mesh.userData as FloatingUserData

          mesh.rotation.x += rotationSpeed.x * config.motionMultiplier
          mesh.rotation.y += rotationSpeed.y * config.motionMultiplier
          mesh.rotation.z += rotationSpeed.z * config.motionMultiplier

          const floatX = Math.cos(time * floatSpeed * 0.8 + floatOffset) * config.floatXAmplitude
          const floatY = Math.sin(time * floatSpeed + floatOffset) * config.floatYAmplitude
          const nextX = originalPosition.x + floatX
          const nextY = originalPosition.y + floatY
          const distance = Math.hypot(nextX, nextY)
          const minDistance = 3.8

          if (distance < minDistance) {
            const safeDistance = distance === 0 ? 1 : distance
            const scale = minDistance / safeDistance

            mesh.position.x = nextX * scale
            mesh.position.y = nextY * scale
          } else {
            mesh.position.x = nextX
            mesh.position.y = nextY
          }

          mesh.position.z = originalPosition.z
          mesh.scale.setScalar(0.92 + Math.sin(time * 0.35 + index) * config.scaleAmplitude)
          mesh.material.opacity = Math.max(
            0.12,
            baseOpacity + Math.sin(time * 0.9 + index) * config.opacityAmplitude
          )
        })

        if (!shouldReduceMotion) {
          camera.position.x = Math.sin(time * 0.08) * config.cameraXAmplitude
          camera.position.y = Math.cos(time * 0.12) * config.cameraYAmplitude
          camera.lookAt(0, 0, 0)
        }

        renderer?.render(scene, camera)
      }

      handleResize = () => {
        const isMobileViewport = window.innerWidth < 768

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer?.setSize(window.innerWidth, window.innerHeight)
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio, isMobileViewport ? 1.2 : 1.5))
      }

      frameRef.current = window.requestAnimationFrame(animate)
      window.addEventListener('resize', handleResize)
    }

    void initThree()

    return () => {
      isDisposed = true
      window.cancelAnimationFrame(frameRef.current)
      if (handleResize) {
        window.removeEventListener('resize', handleResize)
      }

      objects.forEach((mesh) => {
        mesh.material.dispose()
      })

      geometries.forEach((geometry) => {
        geometry.dispose()
      })

      if (renderer && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement)
      }

      renderer?.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}
