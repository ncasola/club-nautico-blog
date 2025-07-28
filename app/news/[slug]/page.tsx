import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getNewsArticle, fetchNewsData } from "@/lib/data"
import Image from "next/image"

interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Eventos: "bg-purple-100/80 text-purple-800 border-purple-200/50",
      Servicios: "bg-green-100/80 text-green-800 border-green-200/50",
      Avisos: "bg-orange-100/80 text-orange-800 border-orange-200/50",
      Deportes: "bg-blue-100/80 text-blue-800 border-blue-200/50",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100/80 text-gray-800 border-gray-200/50"
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:bg-blue-50/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a noticias
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl overflow-hidden">
            {/* Hero Image */}
            {article.image ? (
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  src={article.image || "https://placehold.co/600x400"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                    <Tag className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-blue-600 font-medium">Sin imagen disponible</p>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              {/* Article Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-blue-100/80 text-blue-800 border-blue-200/50">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(article.date)}
                  </Badge>
                  <Badge variant="secondary" className={getCategoryColor(article.category)}>
                    <Tag className="w-3 h-3 mr-1" />
                    {article.category}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">{article.title}</h1>
                <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-blue-200 pl-4 italic">
                  {article.excerpt}
                </p>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg prose-slate max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">{article.content}</div>
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Publicado el {formatDate(article.date)}
                  </div>
                  <div className="flex gap-3">
                    <Link href="/">
                      <Button variant="outline" className="bg-white/70 border-slate-200/50 hover:bg-slate-50/70">
                        Ver todas las noticias
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al inicio
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="mt-12">
            <RelatedArticles currentArticle={article} />
          </div>
        </article>
      </div>
    </div>
  )
}

// Componente para artículos relacionados
async function RelatedArticles({ currentArticle }: { currentArticle: any }) {
  try {
    const allArticles = await fetchNewsData()
    const relatedArticles = allArticles
      .filter((article) => article.id !== currentArticle.id && article.category === currentArticle.category)
      .slice(0, 3)

    if (relatedArticles.length === 0) return null

    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Artículos relacionados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="group block bg-white/70 rounded-lg border border-white/20 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              {article.image ? (
                <div className="relative h-32 mb-3 rounded-md overflow-hidden">
                  <Image
                    src={article.image || "https://placehold.co/600x400"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-32 mb-3 rounded-md bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
                  <Tag className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                {article.title}
              </h4>
              <p className="text-sm text-slate-600 line-clamp-2">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}

// Generar metadata dinámica para cada artículo
export async function generateMetadata({ params }: NewsPageProps) {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    return {
      title: "Artículo no encontrado - Club Náutico Puertito de Güímar",
    }
  }

  return {
    title: `${article.title} - Club Náutico Puertito de Güímar`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: article.image ? [{ url: article.image, alt: article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  }
}

// Generar rutas estáticas para mejor rendimiento
export async function generateStaticParams() {
  try {
    const newsData = await fetchNewsData()
    return newsData.map((article) => ({
      slug: article.id,
    }))
  } catch (error) {
    console.error("Error generando parámetros estáticos:", error)
    return []
  }
}
