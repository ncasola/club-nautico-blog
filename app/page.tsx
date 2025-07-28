import { NewsGrid } from "@/components/news-grid"
import Hero from "@/components/hero"
import { fetchNewsData, NewsArticle } from "@/lib/data"
import { Suspense } from "react"
import { NewsGridSkeleton } from "@/components/news-grid-skeleton"
import Image from "next/image"

export default async function HomePage() {
  let newsData: NewsArticle[] = []
  let errorMessage = null

  try {
    newsData = await fetchNewsData()
  } catch (error) {
    console.error("Error en HomePage:", error)
    errorMessage = "Error al cargar las noticias. Mostrando contenido de respaldo."
    newsData = []
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Últimas Noticias del Club</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Mantente al día con todas las actividades, eventos y novedades del Club Náutico Puertito de Güímar
          </p>
          {errorMessage && (
            <div className="mt-4 p-4 bg-yellow-100/80 border border-yellow-300/50 rounded-lg text-yellow-800 text-center">
              {errorMessage}
            </div>
          )}
        </div>
        <Suspense fallback={<NewsGridSkeleton />}>
          <NewsGrid initialData={newsData} />
        </Suspense>
      </main>
    </div>
  )
}

// Skeleton para el Hero mientras carga
function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden h-[60vh] md:h-[70vh] lg:h-[80vh] bg-slate-800">
      <div className="absolute inset-0 bg-slate-700/10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 shadow-lg">
              <Image src="/logotipo.png" alt="Club Náutico Puertito de Güímar" width={24} height={24} className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">Club Náutico</h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100 mb-6 drop-shadow-xl">
            Puertito de Güímar
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Contigo desde 1970 • Fomentando la hermandad, el respeto y la pasión por el deporte y el mar
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </div>
  )
}