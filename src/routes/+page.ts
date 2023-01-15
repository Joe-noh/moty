import { redirect } from '@sveltejs/kit'
import { currentYear } from '$lib/year'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  throw redirect(302, `/${currentYear()}`)
}
