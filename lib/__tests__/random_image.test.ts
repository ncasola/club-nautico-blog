import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest'

beforeAll(() => {
  process.env.UNSPLASH_ACCESS_KEY = 'test'
  process.env.GOOGLE_DRIVE_URL = 'https://example.com'
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getRandomSeaImage', () => {
  it('returns image url when fetch succeeds', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ urls: { regular: 'image-url' } }),
    })
    vi.stubGlobal('fetch', mockFetch)

    const { getRandomSeaImage } = await import('../random_image')
    const url = await getRandomSeaImage()
    expect(url).toBe('image-url')
    expect(mockFetch).toHaveBeenCalled()
  })

  it('returns placeholder when fetch fails', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    vi.stubGlobal('fetch', mockFetch)

    const { getRandomSeaImage } = await import('../random_image')
    const url = await getRandomSeaImage()
    expect(url).toBe('https://placehold.co/1920x1080')
  })
})
