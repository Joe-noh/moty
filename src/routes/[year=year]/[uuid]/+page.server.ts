import { redirect } from '@sveltejs/kit'
import { addDays } from 'date-fns'
import { prisma } from '$lib/prisma'
import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { PageServerLoad } from './$types'

export const ssr = true

export const load: PageServerLoad = async ({ params, parent }) => {
  const movies: Tmdb.Movie[] = []
  const { year } = await parent()

  const user = await prisma.user.findUnique({ where: { uuid: params.uuid } })

  if (!user) {
    throw redirect(302, `/${params.year}`)
  }

  const ranking = await prisma.ranking.findUnique({
    where: {
      userId_year: { userId: user.id, year: parseInt(year) },
    },
    include: { movies: true },
  })

  if (ranking) {
    const now = new Date()

    for (let i = 0; i < ranking.movies.length; i++) {
      const { movieId } = ranking.movies[i]

      const cache = await prisma.movieCache.findFirst({ where: { movieId, expiresAt: { gt: now } } })

      if (cache) {
        movies.push(cache.responseBody as Tmdb.Movie)
      } else {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}}`, {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        })
        const responseBody: Tmdb.Movie = await response.json()

        const expiresAt = addDays(now, 1)
        await prisma.movieCache.upsert({
          where: { movieId },
          update: { responseBody, expiresAt },
          create: { responseBody, expiresAt, movieId },
        })

        movies.push(responseBody)
      }
    }
  }

  return { movies }
}
