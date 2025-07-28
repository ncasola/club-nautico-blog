"use client"

import { useState, useMemo } from "react"
import { NewsCard } from "./news-card"
import { NewsFilters } from "./news-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, SortAsc, SortDesc, RefreshCw } from "lucide-react"
import { getNewsData } from "@/app/action"
import type { NewsArticle } from "@/lib/data"

interface NewsGridProps {
  initialData: NewsArticle[] | null
}

export function NewsGrid({ initialData }: NewsGridProps) {
  const [newsData, setNewsData] = useState(initialData || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [visibleCount, setVisibleCount] = useState(6)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredAndSortedNews = useMemo(() => {
    let filtered = newsData.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Filtrar por categoría
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    // Ordenar por fecha
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [newsData, searchTerm, sortOrder, selectedCategory])

  const visibleNews = filteredAndSortedNews.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAndSortedNews.length

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const freshData = await getNewsData()
      setNewsData(freshData)
    } catch (error) {
      console.error("Error al actualizar noticias:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="space-y-8">
      <NewsFilters articles={newsData} onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory} />

      {/* Search and Sort Controls */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70 border-slate-200/50 focus:border-blue-300 focus:ring-blue-200/50"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
              <SelectTrigger className="w-full md:w-48 bg-white/70 border-slate-200/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <SortDesc className="w-4 h-4 mr-2" />
                    Más recientes
                  </div>
                </SelectItem>
                <SelectItem value="oldest">
                  <div className="flex items-center">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Más antiguos
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white/70 border-slate-200/50 hover:bg-blue-50/70"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {(searchTerm || selectedCategory !== "Todas") && (
          <div className="mt-4 text-sm text-slate-600">
            {filteredAndSortedNews.length} resultado{filteredAndSortedNews.length !== 1 ? "s" : ""} encontrado
            {filteredAndSortedNews.length !== 1 ? "s" : ""}
            {searchTerm && ` para "${searchTerm}"`}
            {selectedCategory !== "Todas" && ` en ${selectedCategory}`}
          </div>
        )}
      </div>

      {/* News Grid */}
      {filteredAndSortedNews.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-lg">
            <p className="text-slate-600 text-lg">No se encontraron noticias que coincidan con tu búsqueda.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                variant="outline"
                size="lg"
                className="bg-white/70 backdrop-blur-sm border-slate-200/50 hover:bg-blue-50/70 hover:border-blue-300/50"
              >
                Cargar más noticias
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
