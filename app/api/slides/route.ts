import { NextResponse } from 'next/server'
import { sanityClient } from '../../../lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const slides = await sanityClient.fetch(`
    *[_type == "homeSlideshow"][0].slides[]{
      "imageUrl": image.asset->url,
      title,
      caption,
      duration,
      startDate,
      endDate
    }
  `)

  return NextResponse.json(slides)
}
