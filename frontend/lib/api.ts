import type { EventsResponse } from "@/types"




const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

export const fetchEvents = async (): Promise<EventsResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/events?populate=*`, {  
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}






export const getStrapiImageUrl = (url: string): string => {
  if (!url) return "/placeholder.svg?height=400&width=600"

  if (url.startsWith("http")) {
    return url
  }

  return `${API_URL}${url}`
}

