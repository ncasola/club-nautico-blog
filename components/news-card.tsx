import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { NewsArticle } from "@/lib/data"

interface NewsCardProps {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
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
    <Card className="group liquid-glass shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
      <Link href={`/news/${article.id}`} className="block h-full flex-col">
        {article.image && (
          <div className="relative h-56 w-full overflow-hidden -mt-6 -mx-6">
            <Image
              src={article.image || "https://placehold.co/600x400"}
              alt={article.title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        <CardHeader className="p-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-blue-100/80 text-blue-800 border-blue-200/50">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(article.date)}
            </Badge>
            <Badge variant="secondary" className={getCategoryColor(article.category)}>
              <Tag className="w-3 h-3 mr-1" />
              {article.category}
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-black transition-colors line-clamp-2 dark:text-white">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4 flex-grow">
          <p className="text-black/80 line-clamp-3 leading-relaxed dark:text-muted-foreground">{article.excerpt}</p>
        </CardContent>

        <CardFooter className="pt-4 flex-shrink-0">
          <Button
            variant="liquidGlass"
            className="w-full justify-between"
          >
            Leer más
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}
