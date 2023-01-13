import { describe, expect, it } from 'vitest'
import { mockGet } from 'vi-fetch'
import { movieRouter } from './movie'

describe('searchMovies', () => {
  it('search movies with TMDB API', async () => {
    mockGet(/search\/movie/).willResolve<Tmdb.SearchResult>({
      page: 1,
      total_pages: 1,
      total_results: 2,
      results: [
        { id: 1726, title: 'Iron Man', poster_path: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', release_date: '2008-04-30' },
        { id: 10138, title: 'Iron Man 2', poster_path: '/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg', release_date: '2010-04-28' },
      ],
    })

    const { movies, maxPage } = await movieRouter.createCaller({}).searchMovies({ query: 'iron' })

    expect(movies[0]).toEqual(expect.objectContaining({ id: 1726 }))
    expect(movies[1]).toEqual(expect.objectContaining({ id: 10138 }))
    expect(maxPage).toEqual(1)
  })
})
