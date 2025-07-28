import { describe, it, expect, vi } from 'vitest'
import fallback from '../../data/fallback-news.json'
import type { NewsArticle } from '../data'
import { getCategories } from '../data'

// Mock del módulo env
vi.mock('../env', () => ({
  env: {
    GOOGLE_DRIVE_URL: 'https://example.com',
    UNSPLASH_ACCESS_KEY: 'test-key'
  }
}))

describe('getCategories', () => {
  it('returns sorted categories with "Todas" first', () => {
    const categories = getCategories(fallback as NewsArticle[])
    const uniqueSorted = Array.from(new Set((fallback as NewsArticle[]).map(a => a.category))).sort()
    expect(categories[0]).toBe('Todas')
    expect(categories.slice(1)).toEqual(uniqueSorted)
  })
})
