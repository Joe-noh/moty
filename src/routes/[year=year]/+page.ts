import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, parent }) => {
  const { currentUser } = await parent()

  if (currentUser) {
    throw redirect(302, `/${params.year}/${currentUser.uuid}`)
  }
}
