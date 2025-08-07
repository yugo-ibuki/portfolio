'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import type * as THREE from 'three';

interface Background3DProps {
    className?: string;
}

export default function Background3D({ className = '' }: Background3DProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !mountRef.current) return;

        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let objects: THREE.Mesh[] = [];

        const initThreeJS = async () => {
            try {
                // Dynamically import Three.js
                const THREE = await import('three');

                // Check for reduced motion preference
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                // Scene setup
                scene = new THREE.Scene();

                // Camera setup
                camera = new THREE.PerspectiveCamera(
                    60,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    1000
                );
                camera.position.set(0, 0, 8);

                // Renderer setup with mobile optimization
                const isMobile = window.innerWidth < 768;
                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: !isMobile,
                    powerPreference: 'high-performance'
                });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
                renderer.setClearColor(0x000000, 0);

                if (mountRef.current) {
                    mountRef.current.appendChild(renderer.domElement);
                }

                // Create floating objects - bigger sizes
                const geometries = [
                    new THREE.OctahedronGeometry(1.5, 0),
                    new THREE.IcosahedronGeometry(1.2, 0),
                    new THREE.TetrahedronGeometry(1.8, 0),
                    new THREE.DodecahedronGeometry(1.0, 0),
                    new THREE.ConeGeometry(1.0, 2.2, 6),
                    new THREE.CylinderGeometry(0.6, 1.2, 1.8, 8),
                ];

                // More vibrant and bold color palette
                const colorPalette = [
                    new THREE.Color(0x6366f1), // Bright Indigo
                    new THREE.Color(0x8b5cf6), // Bright Violet
                    new THREE.Color(0x3b82f6), // Bright Blue
                    new THREE.Color(0x06b6d4), // Bright Cyan
                    new THREE.Color(0x10b981), // Bright Emerald
                    new THREE.Color(0xf59e0b), // Bright Amber
                    new THREE.Color(0xef4444), // Bright Red
                    new THREE.Color(0xec4899), // Bright Pink
                ];

                // Reduced number of objects
                const objectCount = isMobile ? 4 : 8;

                for (let i = 0; i < objectCount; i++) {
                    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

                    const material = new THREE.MeshBasicMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.4 + Math.random() * 0.4, // Much more visible (0.4-0.8)
                    });

                    const mesh = new THREE.Mesh(geometry, material);

                    // Distribute objects avoiding the center
                    const angle = Math.random() * Math.PI * 2;
                    const radius = 4 + Math.random() * 6; // 4-10 units from center
                    
                    // Create positions in a ring around the center
                    let x = Math.cos(angle) * radius;
                    let y = Math.sin(angle) * radius;
                    let z = (Math.random() - 0.5) * 4;
                    
                    // Add some vertical variation
                    if (Math.random() < 0.3) {
                        y += (Math.random() - 0.5) * 4;
                    }
                    
                    mesh.position.set(x, y, z);

                    // Store animation data - more dynamic movement
                    mesh.userData = {
                        rotationSpeed: {
                            x: (Math.random() - 0.5) * 0.01, // Slower rotation
                            y: (Math.random() - 0.5) * 0.01,
                            z: (Math.random() - 0.5) * 0.01,
                        },
                        originalPosition: mesh.position.clone(),
                        floatOffset: Math.random() * Math.PI * 2,
                        floatSpeed: 0.3 + Math.random() * 0.3, // Slower floating
                        baseOpacity: 0.5 + Math.random() * 0.2, // Pre-calculated opacity
                    };

                    scene.add(mesh);
                    objects.push(mesh);
                }

                // Animation loop
                let lastTime = 0;
                const targetFPS = isMobile ? 30 : 60;
                const frameInterval = 1000 / targetFPS;

                const animate = (currentTime: number) => {
                    frameRef.current = requestAnimationFrame(animate);

                    if (currentTime - lastTime < frameInterval) return;
                    lastTime = currentTime;

                    const time = currentTime * 0.001;

                    objects.forEach((mesh, index) => {
                        const userData = mesh.userData;
                        const motionMultiplier = prefersReducedMotion ? 0.3 : 1.0;

                        // Rotation
                        mesh.rotation.x += userData.rotationSpeed.x * motionMultiplier;
                        mesh.rotation.y += userData.rotationSpeed.y * motionMultiplier;
                        mesh.rotation.z += userData.rotationSpeed.z * motionMultiplier;

                        // Floating motion - keep objects away from center
                        const floatY = Math.sin(time * userData.floatSpeed + userData.floatOffset) * 1.5 * motionMultiplier;
                        const floatX = Math.cos(time * userData.floatSpeed * 0.7 + userData.floatOffset) * 0.8 * motionMultiplier;

                        // Apply floating motion while maintaining distance from center
                        const newX = userData.originalPosition.x + floatX;
                        const newY = userData.originalPosition.y + floatY;
                        
                        // Ensure objects don't drift too close to center
                        const minDistance = 3.5;
                        const distance = Math.sqrt(newX * newX + newY * newY);
                        
                        if (distance < minDistance) {
                            const scale = minDistance / distance;
                            mesh.position.x = newX * scale;
                            mesh.position.y = newY * scale;
                        } else {
                            mesh.position.x = newX;
                            mesh.position.y = newY;
                        }
                        
                        mesh.position.z = userData.originalPosition.z;


                        // Dynamic scaling
                        const scaleBase = 0.8 + Math.sin(time * 0.5 + index) * 0.3 * motionMultiplier;
                        mesh.scale.setScalar(scaleBase);

                        // Opacity variation - much more visible
                        const material = mesh.material as THREE.MeshBasicMaterial;
                        material.opacity = userData.baseOpacity + Math.sin(time + index) * 0.15 * motionMultiplier;
                    });

                    // Subtle camera movement
                    if (!prefersReducedMotion) {
                        camera.position.x = Math.sin(time * 0.1) * 0.5;
                        camera.position.y = Math.cos(time * 0.15) * 0.3;
                        camera.lookAt(0, 0, 0);
                    }

                    renderer.render(scene, camera);
                };

                frameRef.current = requestAnimationFrame(animate);

                // Handle resize
                const handleResize = () => {
                    if (!camera || !renderer) return;

                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                };

                // Event listeners
                window.addEventListener('resize', handleResize);
                
                // Store the handler reference for cleanup
                return handleResize;

            } catch (error) {
                // Silently fail - 3D background is not critical functionality
                // In production, you might want to use a proper logging service
            }
        };

        let handleResize: (() => void) | null = null;
        
        const initializeAndGetHandler = async () => {
            handleResize = await initThreeJS();
        };
        
        initializeAndGetHandler();

        // Cleanup function
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            if (handleResize) {
                window.removeEventListener('resize', handleResize);
            }

            if (mountRef.current && renderer?.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose of Three.js objects
            objects.forEach(mesh => {
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material) mesh.material.dispose();
            });

            if (renderer) renderer.dispose();
        };
    }, [isClient]);

    if (!isClient) {
        return null; // Don't render anything on server
    }

    return (
        <div
            ref={mountRef}
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{ zIndex: -1 }}
        />
    );
}