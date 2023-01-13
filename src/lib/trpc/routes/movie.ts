import { URLSearchParams } from 'url'
import { z } from 'zod'
import { t } from '$lib/trpc/t'
import { TMDB_ACCESS_TOKEN } from '$env/static/private'

export const movieRouter = t.router({
  searchMovies: t.procedure
    .input(
      z.object({
        query: z.string().min(1),
        page: z.number().default(1),
      })
    )
    .query(async ({ input: { query, page } }) => {
      const params = new URLSearchParams({ query: query, page: page.toString() })
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      const { results, total_pages } = (await response.json()) as Tmdb.SearchResult

      return {
        movies: results,
        maxPage: total_pages,
      }
    }),
})
