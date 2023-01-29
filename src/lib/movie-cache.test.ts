import { addMinutes, isWithinInterval } from 'date-fns'
import { prisma } from '$lib/prisma'
import { findCachedMovie, cacheMovie } from '$lib/movie-cache'

const movie = {
  id: 123,
  title: 'The Movie',
  release_date: '2022-12-31',
  poster_path: null,
}

describe('cacheMovie', () => {
  it('caches given movie in a day', async () => {
    await cacheMovie(movie)
    const cache = await prisma.movieCache.findUniqueOrThrow({ where: { movieId: '123' } })

    const body = cache.responseBody as Tmdb.Movie

    expect(body.title).toEqual('The Movie')

    const start = addMinutes(new Date(), 24 * 60 - 1)
    const end = addMinutes(new Date(), 24 * 60 + 1)

    expect(isWithinInterval(cache.expiresAt, { start, end })).toBeTruthy()
  })
})

describe('findCachedMovie', () => {
  it('finds unexpired cache', async () => {
    await cacheMovie(movie)

    expect(await findCachedMovie(movie.id.toString())).toBeTruthy()

    await prisma.movieCache.update({
      where: { movieId: movie.id.toString() },
      data: { expiresAt: addMinutes(new Date(), -1) },
    })

    expect(await findCachedMovie(movie.id.toString())).toBeFalsy()
  })
})
