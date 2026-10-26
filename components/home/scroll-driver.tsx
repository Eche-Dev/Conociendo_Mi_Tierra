'use client'

import { useEffect } from 'react'

export function ScrollDriver() {
  useEffect(() => {
    const root = document.documentElement
    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const max = root.scrollHeight - vh
      root.style.setProperty('--page-p', (max > 0 ? window.scrollY / max : 0).toFixed(4))

      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect()
        if (rect.bottom < -vh || rect.top > vh * 2) continue
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)))
        scene.style.setProperty('--p', progress.toFixed(4))
      }
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.visible = 'true'
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return null
}
