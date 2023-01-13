import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, parent }) => {
  const { user } = await parent()

  if (user) {
    throw redirect(302, `/${params.year}/movies`)
  } else {
    return {
      movies: [],
    }
  }
}
