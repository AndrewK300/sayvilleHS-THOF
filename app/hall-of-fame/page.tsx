'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Footer from '../../components/footer'
import { getInductees } from '../../lib/sanity'

type Inductee = {
  firstName: string
  lastName: string
  inductionYear: number
  classYear?: number
  qualifications?: string[]
  contributions?: string
  photoUrl?: string
}

export default function HallOfFamePage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedInductee, setSelectedInductee] = useState<Inductee | null>(null)

  // Use React Query to fetch and cache inductees
  const { data: inducteeData = [], isLoading } = useQuery<Inductee[]>({
    queryKey: ['inductees'],
    queryFn: getInductees,
  })

  // Flatten all inductees with their year for default view
  const allInductees = inducteeData.map((inductee: Inductee) => ({ ...inductee, year: inductee.inductionYear }))

  // Get inductees for selected year, or all inductees if none selected
  const displayedInductees = selectedYear 
    ? inducteeData.filter((inductee: Inductee) => inductee.inductionYear === selectedYear)
    : allInductees

  const handleReset = () => {
    setSelectedYear(null)
  }

  const handleInducteeClick = (inductee: Inductee) => {
    setSelectedInductee(inductee)
  }

  const handleClosePopup = () => {
    setSelectedInductee(null)
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <p className="text-white text-4xl">Loading...</p>
      </div>
    )
  }

  // Get unique years from the data
  const years = Array.from(new Set(inducteeData.map((i: Inductee) => i.inductionYear))).sort((a, b) => b - a)

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
  className="w-full h-screen flex flex-col bg-cover bg-center pt-[clamp(72px,8vh,140px)]"
  style={{ backgroundImage: "url('/bg.jpg')" }}
>
       

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Induction Years */}
          
<aside className="w-[25%] flex flex-col px-3 md:px-4 lg:px-6 py-4 md:py-6 lg:py-8">
  <h2
  className="shrink-0 text-white font-bold text-center py-2 md:py-4 leading-tight"
  style={{
    backgroundColor: '#4b2d83',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.875rem)',
  }}
>
  INDUCTION YEARS
</h2>

  <ul className="flex-1 overflow-y-auto hide-scrollbar">

              {years.map((year: number, index: number, arr: number[]) => {
                const isSelected = selectedYear === year

                return (
                  <li
                    key={year}
                    onClick={() => setSelectedYear(year)}
className="py-4 text-center text-2xl font-semibold cursor-pointer transition-colors text-black flex items-center justify-center"                    style={{
                      backgroundColor: isSelected ? '#b9a578' : 'white',
                      borderBottom:
                        index !== arr.length - 1 ? '1px solid black' : 'none',
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

          {/* RIGHT: Inductee Gallery */}
          <section className="flex-1 p-8 overflow-y-auto hide-scrollbar">
<div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] [@media(min-aspect-ratio:16/9)]:grid-cols-4">
                {displayedInductees.map((inductee: Inductee, index: number) => (
                <div
                  key={index}
                  className="relative h-82 overflow-hidden cursor-pointer"
                  onClick={() => handleInducteeClick(inductee)}
                >
                  {/* Bottom layer: No image available */}
                  <img 
                    src="/nophoto-v5.png" 
                    alt="No photo available"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  
                  {/* Middle layer: Inductee photo (when available) */}
                  {inductee.photoUrl && (
                    <img 
                      src={inductee.photoUrl}
                      alt={`${inductee.firstName} ${inductee.lastName}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Top layer: Graphic overlay */}
                  <img 
                    src="/hof-info-small-bg.png" 
                    alt=""
                    className="absolute bottom-0 left-0 w-full h-auto object-contain pointer-events-none"
                  />
                  
                  {/* Open icon in bottom right */}
                  <img 
                    src="/Open_Icon.png" 
                    alt="Open details"
                    className="absolute bottom-2 right-2 w-8 h-8 object-contain"
                  />
                  
                  {/* Text content */}
                  {/* Text content */}
<div className="absolute bottom-1 left-2 right-12 flex flex-col text-white leading-none">
  <span className="font-bold text-sm md:text-base lg:text-lg truncate leading-none">
  {inductee.firstName}
</span>
<span className="font-bold text-sm md:text-base lg:text-lg truncate leading-none">
  {inductee.lastName}
</span>
  <span className="text-xs md:text-sm lg:text-base opacity-90">
    {inductee.inductionYear}
  </span>
</div>
                </div>
              ))}
            </div>
          </section>

          {/* Popup Overlay */}
          {selectedInductee && (
            <div 
              className="absolute inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={handleClosePopup}
            >
              <div
  className="relative flex bg-transparent"
  style={{
    width: '80vw',
    maxWidth: '1200px',
    minWidth: '320px',
    height: '80vh',
    maxHeight: '800px',
  }}
>
                {/* Left Half - Photo */}
                <div className="w-1/2 h-full relative">
                  {selectedInductee.photoUrl ? (
                    <img 
                      src={selectedInductee.photoUrl}
                      alt={`${selectedInductee.firstName} ${selectedInductee.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src="/nophoto-v5.png"
                      alt="No photo available"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Right Half - Info with Background */}
                <div className="w-1/2 h-full relative">
                  {/* Background graphic */}
                  <img 
                    src="/HOF_Info_Expanded_BG.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <img 
                    src="/Close_Icon.png" 
                    alt="Close details"
                    className="absolute bottom-2 right-2 w-12 h-12 object-contain"
                  />
                  
               {/* Text overlay - positioned for your graphic */}
                  <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-12">
                    <p className="mb-2" style={{ color: '#b9a578', fontSize: '2.5vw' }}>
                      {selectedInductee.classYear ? `Class of ${selectedInductee.classYear}` : 'Class Year N/A'}
                    </p>
                    <p className="mb-6" style={{ color: '#b9a578', fontSize: '2.5vw' }}>Inducted {selectedInductee.inductionYear}</p>
                    
                    <h2 className="font-bold leading-tight" style={{ fontSize: '3.5vw' }}>{selectedInductee.firstName}</h2>
                    <h2 className="font-bold leading-tight mb-6" style={{ fontSize: '3.5vw' }}>{selectedInductee.lastName}</h2>
                    
                    <p className="font-bold mb-4" style={{ color: '#b9a578', fontSize: '2vw' }}>
                      {selectedInductee.qualifications?.join(', ') || 'N/A'}
                    </p>
                    
                    <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#b9a578' }}></div>
                    
                    <p className="italic" style={{ fontSize: '1.5vw' }}>
                      {selectedInductee.contributions || 'N/A'}
                    </p>
                  </div>
                  {/* Close button (X) - top right */}
                  <button
                    onClick={handleClosePopup}
                    className="absolute top-4 right-4 w-12 h-12"
                  >
                   
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-[10vh]">
          <Footer onHallOfFameClick={handleReset} />
        </div>
      </div>
    </>
  )
}
