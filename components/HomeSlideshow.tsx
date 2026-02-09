'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Slide {
  imageUrl: string
  title?: string
  caption?: string
  duration: number
  startDate?: string
  endDate?: string
}

const FADE_MS = 500
const POLL_INTERVAL_MS = 90000 // 90 seconds

export default function HomeSlideshow() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [index, setIndex] = useState(0)

  // Fetch slides once on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const res = await fetch('/api/slides')
      const data = await res.json()
      setSlides(data)
    }
    fetchSlides()
  }, [])

  // Poll slides every 90 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/slides')
      const newSlides: Slide[] = await res.json()

      // Only update if slides actually changed
      if (JSON.stringify(newSlides) !== JSON.stringify(slides)) {
        setSlides(newSlides)
      }
    }, POLL_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [slides])

  const now = new Date()
  const activeSlides = slides.filter(slide => {
    const start = slide.startDate ? new Date(slide.startDate) : null
    const end = slide.endDate ? new Date(slide.endDate) : null
    if (start && now < start) return false
    if (end && now > end) return false
    return true
  })

  // Cycle slides
  useEffect(() => {
    if (activeSlides.length === 0) return

    const duration = (activeSlides[index]?.duration || 5) * 1000 - FADE_MS
    const timer = setTimeout(() => {
      setIndex(prev => (prev + 1) % activeSlides.length)
    }, duration)

    return () => clearTimeout(timer)
  }, [index, activeSlides.length])

  if (!activeSlides.length) return null
  const slide = activeSlides[index]

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: FADE_MS / 1000,
            ease: 'easeInOut',
          }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title || 'Slide'}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
