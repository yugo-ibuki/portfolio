'use client'

import { useEffect, useRef, useState } from 'react'
import type {
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

interface Background3DProps {
  className?: string
}

type BackgroundMesh = Mesh<BufferGeometry, MeshBasicMaterial>

export default function Background3D({ className = '' }: Background3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mountRef.current) return

    let scene: Scene | null = null
    let camera: PerspectiveCamera | null = null
    let renderer: WebGLRenderer | null = null
    let objects: BackgroundMesh[] = []
    let handleResize: (() => void) | null = null

    const initThreeJS = async () => {
      try {
        const THREE = await import('three')

        const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 8)

        const isMobile = window.innerWidth < 768
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance',
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
        renderer.setClearColor(0x000000, 0)

        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement)
        }

        const geometries = [
          new THREE.OctahedronGeometry(1.5, 0),
          new THREE.IcosahedronGeometry(1.2, 0),
          new THREE.TetrahedronGeometry(1.8, 0),
          new THREE.DodecahedronGeometry(1.0, 0),
          new THREE.ConeGeometry(1.0, 2.2, 6),
          new THREE.CylinderGeometry(0.6, 1.2, 1.8, 8),
        ]

        const colorPalette = [
          new THREE.Color(0x6366f1),
          new THREE.Color(0x8b5cf6),
          new THREE.Color(0x3b82f6),
          new THREE.Color(0x06b6d4),
          new THREE.Color(0x10b981),
          new THREE.Color(0xf59e0b),
          new THREE.Color(0xef4444),
          new THREE.Color(0xec4899),
        ]

        const objectCount = isMobile ? 4 : 8

        for (let i = 0; i < objectCount; i++) {
          const geometry = geometries[Math.floor(Math.random() * geometries.length)]
          const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]

          const material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.4 + Math.random() * 0.4,
          })

          const mesh = new THREE.Mesh(geometry, material)

          const angle = Math.random() * Math.PI * 2
          const radius = 4 + Math.random() * 6

          let x = Math.cos(angle) * radius
          let y = Math.sin(angle) * radius
          let z = (Math.random() - 0.5) * 4

          if (Math.random() < 0.3) {
            y += (Math.random() - 0.5) * 4
          }

          mesh.position.set(x, y, z)

          mesh.userData = {
            rotationSpeed: {
              x: (Math.random() - 0.5) * 0.01,
              y: (Math.random() - 0.5) * 0.01,
              z: (Math.random() - 0.5) * 0.01,
            },
            originalPosition: mesh.position.clone(),
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: 0.3 + Math.random() * 0.3,
          }

          scene.add(mesh)
          objects.push(mesh)
        }

        let lastTime = 0
        const targetFPS = isMobile ? 30 : 60
        const frameInterval = 1000 / targetFPS

        const animate = (currentTime: number) => {
          if (!scene || !camera || !renderer) {
            return
          }

          frameRef.current = requestAnimationFrame(animate)

          if (currentTime - lastTime < frameInterval) return
          lastTime = currentTime

          const time = currentTime * 0.001

          objects.forEach((mesh, index) => {
            const userData = mesh.userData
            const motionMultiplier = shouldReduceMotion ? 0.3 : 1.0

            mesh.rotation.x += userData.rotationSpeed.x * motionMultiplier
            mesh.rotation.y += userData.rotationSpeed.y * motionMultiplier
            mesh.rotation.z += userData.rotationSpeed.z * motionMultiplier

            const floatY =
              Math.sin(time * userData.floatSpeed + userData.floatOffset) * 1.5 * motionMultiplier
            const floatX =
              Math.cos(time * userData.floatSpeed * 0.7 + userData.floatOffset) *
              0.8 *
              motionMultiplier

            const newX = userData.originalPosition.x + floatX
            const newY = userData.originalPosition.y + floatY

            const minDistance = 3.5
            const distance = Math.sqrt(newX * newX + newY * newY)

            if (distance < minDistance) {
              const scale = minDistance / distance
              mesh.position.x = newX * scale
              mesh.position.y = newY * scale
            } else {
              mesh.position.x = newX
              mesh.position.y = newY
            }

            mesh.position.z = userData.originalPosition.z

            const scaleBase = 0.8 + Math.sin(time * 0.5 + index) * 0.3 * motionMultiplier
            mesh.scale.setScalar(scaleBase)

            const baseOpacity = 0.5 + Math.random() * 0.2
            mesh.material.opacity =
              baseOpacity + Math.sin(time + index) * 0.15 * motionMultiplier
          })

          if (!shouldReduceMotion) {
            camera.position.x = Math.sin(time * 0.1) * 0.5
            camera.position.y = Math.cos(time * 0.15) * 0.3
            camera.lookAt(0, 0, 0)
          }

          renderer.render(scene, camera)
        }

        frameRef.current = requestAnimationFrame(animate)

        handleResize = () => {
          if (!camera || !renderer) return

          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }

        window.addEventListener('resize', handleResize)
      } catch (error) {
        console.error('Failed to initialize 3D background:', error)
      }
    }

    initThreeJS()

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      if (handleResize) {
        window.removeEventListener('resize', handleResize)
      }

      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      objects.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose()
        if (mesh.material) mesh.material.dispose()
      })

      if (renderer) renderer.dispose()
    }
  }, [isClient])

  if (!isClient) {
    return null
  }

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}
