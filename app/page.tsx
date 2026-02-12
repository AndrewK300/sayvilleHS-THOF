import HomeSlideshow from '../components/HomeSlideshow'
import Header from '../components/header'
import Footer from '../components/footer'
import { getHomeSlides } from '../lib/sanity'

export const revalidate = 60

export default async function HomePage() {
  const slides = await getHomeSlides()

  return (
    <main className="w-screen h-screen relative overflow-hidden">
      {/* Slideshow fills entire screen */}
      <HomeSlideshow/>

      {/* Header overlay */}
      <Header />

<div
  className="
    absolute left-0
    bottom-[clamp(6vh,10vh,14vh)]
    inline-block
    bg-black text-white font-medium
    px-[clamp(14px,1.6vw,36px)]
    py-[clamp(8px,1.2vh,20px)]
    text-[clamp(12px,1.8vw,36px)]
    leading-tight
    max-w-[90vw]
  "
>
  <span className="font-italic">Interactive System Graciously Funded by{' '}</span>
  <span className="font-bold">The Sayville Athletic Foundation</span>
</div>






      {/* Footer sticky to bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[10vh]">
        <Footer />
      </div>
    </main>
  )
}
