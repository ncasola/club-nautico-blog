import { describe, it, expect, vi, afterEach } from 'vitest'
import { getNewsArticle } from '../data'

const mockArticles = [
  { id: 'a1', title: 't1', date: 'd', excerpt: 'e', content: 'c', image: 'img1', category: 'c1' },
  { id: 'a2', title: 't2', date: 'd', excerpt: 'e', content: 'c', image: 'img2', category: 'c2' }
]

// Mock del módulo env
vi.mock('../env', () => ({
  env: {
    GOOGLE_DRIVE_URL: 'https://example.com',
    UNSPLASH_ACCESS_KEY: 'test-key'
  }
}))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getNewsArticle', () => {
  it('returns article matching slug', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockArticles))
    }))
    const article = await getNewsArticle('a1')
    expect(article).toEqual(mockArticles[0])
  })

  it('returns null when not found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockArticles))
    }))
    const article = await getNewsArticle('unknown')
    expect(article).toBeNull()
  })
})
