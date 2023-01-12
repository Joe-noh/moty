import { json } from '@sveltejs/kit'
import { URLSearchParams } from 'url'
import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  const { query, page } = await request.json()

  if (query) {
    const params = new URLSearchParams({ query, page })
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    return json(await res.json())
  } else {
    return json({})
  }
}
