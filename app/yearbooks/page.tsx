'use client'

import { useState, useRef } from 'react'
import Footer from '../../components/footer'


// Map years to FlipHTML5 URLs
const yearbookUrls: Record<number, string> = {
  2025: 'https://online.fliphtml5.com/ufqib/2025/',
  2024: 'https://online.fliphtml5.com/ufqib/2024/',
  2023: 'https://online.fliphtml5.com/ufqib/2023/',
  // Add more years and their URLs here
}

export default function YearbooksPage() {
  const years = [
    2025, 2024, 2023, 
  ]

  const [selectedYear, setSelectedYear] = useState<number | null>(years[0])
  const [searchValue, setSearchValue] = useState('')
  const [showKeyboard, setShowKeyboard] = useState(false)

  return (
    <>
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className="w-full h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Spacer for absolute header (matches header h-[8%]) */}
        <div className="h-[8%]" />

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Years List */}
          <aside className="w-[25%] flex flex-col px-6 py-8">
            {/* Header */}
            <h2
              className="text-white text-3xl font-bold text-center py-5"
              style={{ backgroundColor: '#4b2d83' }}
            >
              YEARS
            </h2>

            {/* Years list – scrolls independently */}
            <ul className="overflow-y-auto bg-white hide-scrollbar" style={{ maxHeight: '85%' }}>
              {years.map((year, index, arr) => {
                const isSelected = selectedYear === year

                return (
                  <li
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className="py-4 text-center text-2xl font-semibold cursor-pointer transition-colors text-black"
                    style={{
                      backgroundColor: isSelected ? '#b9a578' : 'white',
                      borderBottom: index !== arr.length - 1 ? '1px solid black' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#b9a578'
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'white'
                    }}
                  >
                    {year}
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* RIGHT: Yearbook Viewer */}
          <section className="flex-1 p-8 relative">
            {/* Search input */}
            

            <div 
              className="w-full h-full relative"
              style={{ 
                border: '6px solid #b9a578',
                backgroundColor: ''
              }}
            >
              {selectedYear && yearbookUrls[selectedYear] ? (
                <iframe
                  src={yearbookUrls[selectedYear]}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={`${selectedYear} Yearbook`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center relative">
                  <img 
                    src="/sayville-logo.png" 
                    alt="Sayville Logo"
                    className="absolute inset-0 w-full h-full object-contain opacity-20"
                  />
                  <p className="text-white text-3xl relative z-10">
                    {selectedYear ? 'Yearbook not available for this year' : 'Select a year to view yearbook'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="h-[10vh]">
          <Footer />
        </div>

        
      </div>
    </>
  )
}
