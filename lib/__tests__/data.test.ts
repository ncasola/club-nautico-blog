import { describe, it, expect } from 'vitest'
import fallback from '../../data/fallback-news.json'
import type { NewsArticle } from '../data'
import { getCategories } from '../data'

describe('getCategories', () => {
  it('returns sorted categories with "Todas" first', () => {
    const categories = getCategories(fallback as NewsArticle[])
    const uniqueSorted = Array.from(new Set((fallback as NewsArticle[]).map(a => a.category))).sort()
    expect(categories[0]).toBe('Todas')
    expect(categories.slice(1)).toEqual(uniqueSorted)
  })
})
