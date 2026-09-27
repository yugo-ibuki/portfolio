'use client'

import { useEffect, useState, type RefObject } from 'react'

// 要素が初めて画面に入ったら true を返し、以後は監視しない
export const useInViewOnce = (ref: RefObject<Element | null>, threshold = 0.25) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}
