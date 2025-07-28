import { env } from "./env"

export async function getRandomSeaImage() {
    const UNSPLASH_ACCESS_KEY = env.UNSPLASH_ACCESS_KEY
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=ocean+sea+water+blue+waves&orientation=landscape&w=1920&h=1080`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
          next: { revalidate: 3600 }, // Cache por 1 hora
        },
      )
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
  
      const data = await response.json()
      return data.urls.regular
    } catch (error) {
      console.error("Error obteniendo imagen del mar:", error)
      // Fallback a una imagen por defecto
      return "https://placehold.co/1920x1080"
    }
  }