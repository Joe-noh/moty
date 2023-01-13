import { describe, expect, it } from 'vitest'
import { movieRouter } from './movie'

describe('searchMovies', () => {
  it('search movies with TMDB API', async () => {
    const res = await movieRouter.createCaller({}).searchMovies({ query: 'iron' })

    expect(res).toBe({ a: 1 })
  })
})
