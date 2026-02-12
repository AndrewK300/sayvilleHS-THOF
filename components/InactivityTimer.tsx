'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface InactivityTimerProps {
  timeout?: number // in milliseconds
  homeTimeout?: number // timeout specifically for home page
}

export default function InactivityTimer({ timeout = 60000, homeTimeout = 300000 }: InactivityTimerProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't run timer on home page
    if (pathname === '/') return

    // Use homeTimeout for home, regular timeout for other pages
    const currentTimeout = pathname === '/' ? homeTimeout : timeout

    let timer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        router.push('/')
      }, currentTimeout)
    }

    // Events to track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

    // Set up event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    // Start the timer
    resetTimer()

    // Cleanup
    return () => {
      clearTimeout(timer)
      events.forEach(event => {
        document.removeEventListener(event, resetTimer)
      })
    }
  }, [pathname, router, timeout, homeTimeout])

  return null
}
