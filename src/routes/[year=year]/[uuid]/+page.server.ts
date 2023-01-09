import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  // fetch movies from DB

  return { movies: [] }
}
