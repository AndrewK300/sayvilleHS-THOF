'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Footer from '../../components/footer'
import { getChampionships } from '../../lib/sanity'

type Championship = {
  sport: string
  year: number
  category: string
  title: string
}

export default function ChampionshipsPage() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Use React Query to fetch and cache championships
  const { data: championshipData = [], isLoading } = useQuery<Championship[]>({
    queryKey: ['championships'],
    queryFn: getChampionships,
  })

  // Get unique sports from the data, sorted alphabetically
  const sports = Array.from(new Set(championshipData.map((c: Championship) => c.sport).filter(Boolean))).sort()

  // Set default selected sport to the first one if none selected
  if (!selectedSport && sports.length > 0) {
    setSelectedSport(sports[0])
  }

  // Filter championships by selected sport
  const sportChampionships = selectedSport 
    ? championshipData.filter((c: Championship) => c.sport === selectedSport)
    : []
  
  // Get unique categories for the selected sport
  const categories = Array.from(new Set(sportChampionships.map((c: Championship) => c.category).filter(Boolean)))
  
  // Filter championships by category if one is selected
  const displayedChampionships = selectedCategory
    ? sportChampionships.filter((c: Championship) => c.category === selectedCategory)
    : sportChampionships

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport)
    setSelectedCategory(null)
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <p className="text-white text-4xl">Loading...</p>
      </div>
    )
  }

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

        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Sports List */}
<aside className="w-[25%] flex flex-col pl-3 pr-2 md:pl-4 md:pr-3 lg:pl-6 lg:pr-4 py-4 md:py-6 lg:py-8">            
  <h2
  className="shrink-0 text-white font-bold text-center py-2 md:py-4 leading-tight"
  style={{
    backgroundColor: '#4b2d83',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.875rem)',
  }}
>
  SPORTS
</h2>

            <ul className="overflow-y-auto bg-white hide-scrollbar" style={{ maxHeight: '85%' }}>
              {sports.map((sport: string, index: number, arr: string[]) => {
                const isSelected = selectedSport === sport

                return (
                  <li
                    key={sport}
                    onClick={() => handleSportChange(sport)}
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
                    <span
  style={{
    fontSize: 'clamp(0.9rem, 1.3vw, 1.875rem)',
    lineHeight: '1',
    display: 'block',
    textAlign: 'center',
  }}
>
  {sport}
</span>

                  </li>
                )
              })}
            </ul>
          </aside>

          {/* RIGHT: Championships Content */}
          <div className="flex-1 flex flex-col">
            <section className="flex-1 px-8 pb-8 overflow-y-auto hide-scrollbar">
<div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] [@media(min-aspect-ratio:16/9)]:grid-cols-4">
                  {displayedChampionships.map((championship: Championship, index: number) => (
                 <div key={index} className="relative w-full overflow-hidden">
  {/* Aspect-ratio box: ~16:9 without using "16/9" */}
  <div style={{ paddingTop: '115%' }} />

  {/* Actual banner content */}
  <div className="absolute inset-0">
    <img
      src="/banner-style-edited.png"
      alt=""
      className="absolute inset-0 w-full h-full object-fill"
    />

    <div className="absolute top-10 px-10 left-0 right-0 text-center text-white leading-none" style={{fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', fontFamily:'OldSport, sans-serif'}}>
  {championship.sport}
</div>


    <div className="absolute top-12 inset-0 flex flex-col text-white px-12">
      <h3
  style={{
    fontSize: 'clamp(1rem, 3vw, 1rem)',
    lineHeight: '1.1',
    textAlign: 'center',
    fontFamily:'OldSport, sans-serif'
  }}
  className=" mt-10" 
>
  {championship.title}
</h3>

    </div>

    <div className="absolute top-10 inset-0 flex items-center justify-center text-white pt-20">
<p
  style={{
    fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
    lineHeight: '1',
    fontFamily:'OldSport, sans-serif'
  }}

>
  {championship.year}
</p>    </div>
  </div>
</div>
                ))}
              </div>
            </section>

            {categories.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-4 px-8 py-2">
                {categories.map((category: string) => (
                  <button
  key={category}
  onClick={() =>
    setSelectedCategory(selectedCategory === category ? null : category)
  }
  className="px-6 py-2 font-semibold rounded transition"
  style={{
    backgroundColor: selectedCategory === category ? '#b9a578' : 'transparent',
    color: selectedCategory === category ? '#4a2d81' : 'white',
    border: '2px solid white',

    // ✅ proportional scaling ONLY (matches rest of page)
    fontSize: 'clamp(0.7rem, 1.6vw, 1rem)',
    lineHeight: '1',
  }}
>
  {category}
</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-[10vh]">
          <Footer />
        </div>
      </div>
    </>
  )
}
