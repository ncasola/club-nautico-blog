import { describe, it, expect, vi, afterEach } from 'vitest'

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
