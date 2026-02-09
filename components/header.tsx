'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import sayvilleLogo from '../public/sayville-logo.png'

export default function Header() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime =
    currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }) +
    ' | ' +
    currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })

  return (
    <header
  className="
    absolute top-0 left-0 w-full z-50
    flex items-center justify-between
    px-[clamp(12px,1.2vw,28px)]
    h-[8vh] min-h-[72px] max-h-[140px]
    pt-[clamp(6px,0.8vh,16px)]
  "
>
      {/* Logo (clickable) */}
      <button
        onClick={() => router.push('/')}
        className="relative h-full aspect-[1/1] flex items-center"
        aria-label="Go to Home"
      >
        <Image
          src={sayvilleLogo}
          alt="Sayville Logo"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 1920px) 10vh, 140px"
        />
      </button>

      {/* Date/Time */}
      <div
        className="
          font-bold text-black whitespace-nowrap
          text-[clamp(12px,1.6vw,28px)]
        "
      >
        {formattedTime}
      </div>
    </header>
  )
}