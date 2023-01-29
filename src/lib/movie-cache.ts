import { addDays } from 'date-fns'
import { prisma } from '$lib/prisma'

export async function findCachedMovie(movieId: string) {
  const now = new Date()

  return await prisma.movieCache.findFirst({ where: { movieId, expiresAt: { gt: now } } })
}

export async function cacheMovie(movie: Tmdb.Movie) {
  const now = new Date()
  const movieId = movie.id.toString()
  const expiresAt = addDays(now, 1)

  await prisma.movieCache.upsert({
    where: { movieId },
    update: { responseBody: movie, expiresAt },
    create: { responseBody: movie, expiresAt, movieId },
  })
}
