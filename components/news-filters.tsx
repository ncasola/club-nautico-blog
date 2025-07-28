"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import type { NewsArticle } from "@/lib/data"

interface NewsFiltersProps {
  articles: NewsArticle[]
  onCategoryChange: (category: string) => void
  selectedCategory: string
}

export function NewsFilters({ articles, onCategoryChange, selectedCategory }: NewsFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const uniqueCategories = new Set(articles.map((article) => article.category))
    setCategories(["Todas", ...Array.from(uniqueCategories).sort()])
  }, [articles])

  return (
    <div className="mb-8">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-700 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar por categoría
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          </Button>
        </div>

        <div className={`flex flex-wrap gap-2 ${showFilters ? "block" : "hidden md:flex"}`}>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-700"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
