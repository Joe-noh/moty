import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const query = data.get('query')

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    const { results } = await res.json()

    return { movies: results }
  },
}
