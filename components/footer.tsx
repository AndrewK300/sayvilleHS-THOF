'use client'

import { useRouter, usePathname} from 'next/navigation'

interface FooterProps {
  onHallOfFameClick?: () => void
}

export default function Footer({ onHallOfFameClick }: FooterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleHallOfFameClick = () => {
    if (pathname === '/hall-of-fame' && onHallOfFameClick) {
      onHallOfFameClick()
    } else {
      router.push('/hall-of-fame')
    }
  }

  return (
    <footer className="w-full h-full flex justify-around items-center px-6" style={{ backgroundColor: '#332057' }}>
      <button
        className="w-[25%] h-[80%] text-white text-[clamp(12px,2.2vw,46px)] font-bold uppercase transition whitespace-nowrap overflow-hidden trancate"
        style={{
          backgroundColor: pathname === '/hall-of-fame' ? '#b9a578' : '#4a2d81',
          outline: pathname === '/hall-of-fame' ? '3px solid white' : 'none',
          outlineOffset: '-3px',
          color: pathname === '/hall-of-fame' ? '#4a2d81' : 'white',
        }}
        onMouseEnter={(e) => {
          if (pathname !== '/hall-of-fame') {
            e.currentTarget.style.backgroundColor = '#b9a578'
          }
        }}
        onMouseLeave={(e) => {
          if (pathname !== '/hall-of-fame') {
            e.currentTarget.style.backgroundColor = '#4a2d81'
          }
        }}
        onClick={handleHallOfFameClick}
      >
        Hall of Fame
      </button>

      <button
        className="w-[25%] h-[80%] text-white text-[clamp(12px,2.2vw,46px)] font-bold uppercase transition whitespace-nowrap overflow-hidden trancate"
        style={{
          backgroundColor: pathname === '/championships' ? '#b9a578' : '#4a2d81',
          outline: pathname === '/championships' ? '3px solid white' : 'none',
          outlineOffset: '-3px',
          color: pathname === '/championships' ? '#4a2d81' : 'white',
        }}
        onMouseEnter={(e) => {
          if (pathname !== '/championships') {
            e.currentTarget.style.backgroundColor = '#b9a578'
          }
        }}
        onMouseLeave={(e) => {
          if (pathname !== '/championships') {
            e.currentTarget.style.backgroundColor = '#4a2d81'
          }
        }}
        onClick={() => router.push('/championships')}
      >
        Championships
      </button>

      <button
        className="w-[25%] h-[80%] text-white text-[clamp(12px,2.2vw,46px)] font-bold uppercase transition whitespace-nowrap overflow-hidden trancate"
        style={{
          backgroundColor: pathname === '/yearbooks' ? '#b9a578' : '#4a2d81',
          outline: pathname === '/yearbooks' ? '3px solid white' : 'none',
          outlineOffset: '-3px',
          color: pathname === '/yearbooks' ? '#4a2d81' : 'white',
        }}
        onMouseEnter={(e) => {
          if (pathname !== '/yearbooks') {
            e.currentTarget.style.backgroundColor = '#b9a578'
          }
        }}
        onMouseLeave={(e) => {
          if (pathname !== '/yearbooks') {
            e.currentTarget.style.backgroundColor = '#4a2d81'
          }
        }}
        onClick={() => router.push('/yearbooks')}
      >
        Yearbooks
      </button>
    </footer>
  )
}