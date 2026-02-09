import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'orysir1u',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getHomeSlides() {
  const slides = await sanityClient.fetch(`
    *[_type == "homeSlideshow"][0].slides[]{
      image,
      duration,
      startDate,
      endDate
    }
  `)

  // Convert image objects to usable URLs
  return slides.map((slide: any) => ({
    ...slide,
    imageUrl: slide.image ? urlFor(slide.image).url() : undefined,
  }))
}

export async function getInductees() {
  const inductees = await sanityClient.fetch(`
    *[_type == "inductee"] | order(inductionYear desc, lastName asc) {
      firstName,
      lastName,
      inductionYear,
      classYear,
      qualifications,
      contributions,
      "photoUrl": photo.asset->url
    }
  `)
  
  return inductees
}

export async function getChampionships() {
  const championships = await sanityClient.fetch(`
    *[_type == "championship"] | order(sport asc, year desc) {
      sport,
      year,
      category,
      title
    }
  `)
  
  return championships
}