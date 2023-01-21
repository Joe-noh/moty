import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { t } from '$lib/trpc/t'
import { prisma } from '$lib/prisma'

export const rankingRouter = t.router({
  fetchRanking: t.procedure
    .input(
      z.object({
        year: z.number(),
      })
    )
    .query(async ({ input: { year }, ctx: { user } }) => {
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const ranking = await prisma.ranking.upsert({
        where: { userId_year: { userId: user.id, year } },
        update: {},
        create: { userId: user.id, year },
        include: { movies: true },
      })

      return { ranking }
    }),
  appendToRanking: t.procedure
    .input(
      z.object({
        year: z.number(),
        movieId: z.string(),
      })
    )
    .query(async ({ input: { year, movieId }, ctx: { user } }) => {
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const ranking = await prisma.ranking.upsert({
        where: { userId_year: { userId: user.id, year } },
        update: {},
        create: { userId: user.id, year },
        include: { movies: true },
      })

      if (ranking.movies.length >= 5) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You can pick up to 5 movies.',
        })
      }

      await prisma.movie.create({ data: { movieId, rankingId: ranking.id, position: ranking.movies.length + 1 } })

      return { ranking }
    }),
})
