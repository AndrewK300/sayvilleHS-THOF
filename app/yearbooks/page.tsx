'use client'

import { useState, useRef } from 'react'
import Footer from '../../components/footer'


// Map years to FlipHTML5 URLs
const yearbookUrls: Record<number, string> = {
  /*2025: 'https://online.fliphtml5.com/ufqib/2025/',
  2024: 'https://online.fliphtml5.com/ufqib/2024/',
  2023: 'https://online.fliphtml5.com/ufqib/2023/',
  2022: 'https://online.fliphtml5.com/ufqib/2022/',
  2021: 'https://online.fliphtml5.com/ufqib/2021/',
  2020: 'https://online.fliphtml5.com/ufqib/2020/',
  2019: 'https://online.fliphtml5.com/ufqib/2019/',
  2018: 'https://online.fliphtml5.com/ufqib/2018/',
  2017: 'https://online.fliphtml5.com/ufqib/2017/',
  2016: 'https://online.fliphtml5.com/ufqib/2016/',
  2015: 'https://online.fliphtml5.com/ufqib/2015/',
  2014: 'https://online.fliphtml5.com/ufqib/2014/',
  2013: 'https://online.fliphtml5.com/ufqib/2013/',
  2012: 'https://online.fliphtml5.com/ufqib/2012/',
  2011: 'https://online.fliphtml5.com/ufqib/2011/',
  2010: 'https://online.fliphtml5.com/ufqib/2010/',
  2009: 'https://online.fliphtml5.com/ufqib/2009/',
  2008: 'https://online.fliphtml5.com/ufqib/2008/',
  2007: 'https://online.fliphtml5.com/ufqib/2007/',
  2006: 'https://online.fliphtml5.com/ufqib/2006/',
  2005: 'https://online.fliphtml5.com/ufqib/2005/',
  2004: 'https://online.fliphtml5.com/ufqib/2004/',
  2003: 'https://online.fliphtml5.com/ufqib/2003/',
  2002: 'https://online.fliphtml5.com/ufqib/2002/',
  2001: 'https://online.fliphtml5.com/ufqib/2001/',
  2000: 'https://online.fliphtml5.com/ufqib/2000/',
  1999: 'https://online.fliphtml5.com/ufqib/1999/',
  1998: 'https://online.fliphtml5.com/ufqib/1998/',
  1997: 'https://online.fliphtml5.com/ufqib/1997/',
  1996: 'https://online.fliphtml5.com/ufqib/1996/',
  1995: 'https://online.fliphtml5.com/ufqib/1995/',
  1994: 'https://online.fliphtml5.com/ufqib/1994/',
  1993: 'https://online.fliphtml5.com/ufqib/1993/',
  1992: 'https://online.fliphtml5.com/ufqib/1992/',
  1991: 'https://online.fliphtml5.com/ufqib/1991/',
  1990: 'https://online.fliphtml5.com/ufqib/1990/',
  1989: 'https://online.fliphtml5.com/ufqib/1989/',
  1988: 'https://online.fliphtml5.com/ufqib/1988/',
  1987: 'https://online.fliphtml5.com/ufqib/1987/',
  1986: 'https://online.fliphtml5.com/ufqib/1986/',
  1985: 'https://online.fliphtml5.com/ufqib/1985/',
  1984: 'https://online.fliphtml5.com/ufqib/1984/',
  1983: 'https://online.fliphtml5.com/ufqib/1983/',
  1982: 'https://online.fliphtml5.com/ufqib/1982/',
  1981: 'https://online.fliphtml5.com/ufqib/1981/',
  1980: 'https://online.fliphtml5.com/ufqib/1980/',
  1979: 'https://online.fliphtml5.com/ufqib/1979/',
  1978: 'https://online.fliphtml5.com/ufqib/1978/',
  1977: 'https://online.fliphtml5.com/ufqib/1977/',
  1976: 'https://online.fliphtml5.com/ufqib/1976/',
  1975: 'https://online.fliphtml5.com/ufqib/1975/',
  1974: 'https://online.fliphtml5.com/ufqib/1974/',
  1973: 'https://online.fliphtml5.com/ufqib/1973/',
  1971: 'https://online.fliphtml5.com/ufqib/1971/',
  1970: 'https://online.fliphtml5.com/ufqib/1970/',
  1969: 'https://online.fliphtml5.com/ufqib/1969/',
  1968: 'https://online.fliphtml5.com/ufqib/1968/',
  1967: 'https://online.fliphtml5.com/ufqib/1967/',
  1966: 'https://online.fliphtml5.com/ufqib/1966/',
  1965: 'https://online.fliphtml5.com/ufqib/1965/',
  1964: 'https://online.fliphtml5.com/ufqib/1964/',
  1963: 'https://online.fliphtml5.com/ufqib/1963/',
  1962: 'https://online.fliphtml5.com/ufqib/1962/',
  1961: 'https://online.fliphtml5.com/ufqib/1961/',
  1960: 'https://online.fliphtml5.com/ufqib/1960/',
  1957: 'https://online.fliphtml5.com/ufqib/1957/',
  1955: 'https://online.fliphtml5.com/ufqib/1955/',
  1954: 'https://online.fliphtml5.com/ufqib/1954/',
  1953: 'https://online.fliphtml5.com/ufqib/1953/',
  1952: 'https://online.fliphtml5.com/ufqib/1952/',
  1951: 'https://online.fliphtml5.com/ufqib/1951/',
  1950: 'https://online.fliphtml5.com/ufqib/1950/',
  1949: 'https://online.fliphtml5.com/ufqib/1949/',
  1948: 'https://online.fliphtml5.com/ufqib/1948/',
  1947: 'https://online.fliphtml5.com/ufqib/1947/',
  1946: 'https://online.fliphtml5.com/ufqib/1946/',
  1945: 'https://online.fliphtml5.com/ufqib/1945/',
  1944: 'https://online.fliphtml5.com/ufqib/1944/',
  1943: 'https://online.fliphtml5.com/ufqib/1943/',
  1942: 'https://online.fliphtml5.com/ufqib/1942/',
  1941: 'https://online.fliphtml5.com/ufqib/1941/',
  1940: 'https://online.fliphtml5.com/ufqib/1940/',
  1939: 'https://online.fliphtml5.com/ufqib/1939/',
  1938: 'https://online.fliphtml5.com/ufqib/1938/',
  1937: 'https://online.fliphtml5.com/ufqib/1937/',
  1936: 'https://online.fliphtml5.com/ufqib/1936/',
  1935: 'https://online.fliphtml5.com/ufqib/1935/',
  1934: 'https://online.fliphtml5.com/ufqib/1934/',
  1933: 'https://online.fliphtml5.com/ufqib/1933/',
  1932: 'https://online.fliphtml5.com/ufqib/1932/',
  1930: 'https://online.fliphtml5.com/ufqib/1930/',
  1927: 'https://online.fliphtml5.com/ufqib/1927---Combined-and-OCR/',
  1926: 'https://online.fliphtml5.com/ufqib/1926---Combined-and-OCR/',*/
}

export default function YearbooksPage() {
  const years = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
  2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006,
  2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996,
  1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
  1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976,
  1975, 1974, 1973, 1971, 1970, 1969, 1968, 1967, 1966, 1965,
  1964, 1963, 1962, 1961, 1960, 1957, 1955, 1954, 1953, 1952,
  1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942,
  1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932,
  1930, 1927, 1926,
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
