import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest'
import { getNewsArticle } from '../data'

const mockArticles = [
  { id: 'a1', title: 't1', date: 'd', excerpt: 'e', content: 'c', image: 'img1', category: 'c1' },
  { id: 'a2', title: 't2', date: 'd', excerpt: 'e', content: 'c', image: 'img2', category: 'c2' }
]

beforeAll(() => {
  process.env.GOOGLE_DRIVE_URL = 'https://example.com'
  process.env.UNSPLASH_ACCESS_KEY = 'key'
})

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
