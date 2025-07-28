import fallbackNewsData from "@/data/fallback-news.json"
import { env } from "./env"
import { z } from "zod"

export const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  content: z.string(),
  image: z.string().nullable(),
  category: z.string(),
})

export type NewsArticle = z.infer<typeof NewsArticleSchema>

const GOOGLE_DRIVE_URL = env.GOOGLE_DRIVE_URL
const UNSPLASH_ACCESS_KEY = env.UNSPLASH_ACCESS_KEY

// Cache simple en memoria
let cachedData: NewsArticle[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

// Cache para imágenes de Unsplash
const imageCache = new Map<string, string>()

async function getUnsplashImage(query: string): Promise<string | null> {
  // Verificar caché de imágenes
  if (imageCache.has(query)) {
    return imageCache.get(query) || null
  }

  try {
    // Crear query más específico para mejores resultados
    const searchQuery = query.replace(/[^\w\s]/g, "").trim()

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache por 1 hora
      },
    )

    if (!response.ok) {
      console.error(`Error Unsplash: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.regular
      imageCache.set(query, imageUrl)
      return imageUrl
    }

    return null
  } catch (error) {
    console.error("Error obteniendo imagen de Unsplash:", error)
    return null
  }
}

async function enrichArticlesWithImages(articles: NewsArticle[]): Promise<NewsArticle[]> {
  const enrichedArticles = await Promise.all(
    articles.map(async (article) => {
      if (article.image) {
        return article // Ya tiene imagen
      }

      // Obtener imagen basada en el título y categoría
      const imageQuery = `${article.title} ${article.category}`
      const unsplashImage = await getUnsplashImage(imageQuery)

      return {
        ...article,
        image: unsplashImage,
      }
    }),
  )

  return enrichedArticles
}

export async function fetchNewsData(): Promise<NewsArticle[]> {
  // Verificar si tenemos datos en caché y no han expirado
  const now = Date.now()
  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    console.log("Usando datos desde caché")
    return cachedData
  }

  try {

    const response = await fetch(GOOGLE_DRIVE_URL, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NextJS-App)",
        Accept: "application/json, text/plain, */*",
      },
      next: { revalidate: 300 },
    })


    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const textContent = await response.text()

    let data: NewsArticle[]

    try {
      data = JSON.parse(textContent)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError)
      throw new Error("La respuesta no es un JSON válido")
    }

    if (!Array.isArray(data)) {
      throw new Error("Los datos no son un array válido")
    }

    // Validar estructura de los datos
    const validatedData = data.filter((item) => item && NewsArticleSchema.safeParse(item).success)

    if (validatedData.length === 0) {
      throw new Error("No se encontraron artículos válidos en los datos")
    }

    // Enriquecer con imágenes de Unsplash
    const enrichedData = await enrichArticlesWithImages(validatedData)

    // Actualizar caché
    cachedData = enrichedData
    cacheTimestamp = now

    return enrichedData
  } catch (error) {
    console.error("Error al obtener datos de noticias:", error)

    // Si hay datos en caché, usarlos como fallback
    if (cachedData) {
      return cachedData
    }

    // Usar datos de fallback del JSON
    const fallbackData = await enrichArticlesWithImages(fallbackNewsData as NewsArticle[])
    return fallbackData
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const newsData = await fetchNewsData()
  return newsData.find((article) => article.id === slug) || null
}

export function getCategories(articles: NewsArticle[]): string[] {
  const categories = new Set(articles.map((article) => article.category))
  return ["Todas", ...Array.from(categories).sort()]
}
