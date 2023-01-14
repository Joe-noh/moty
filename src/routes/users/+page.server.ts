import { redirect } from '@sveltejs/kit'
import { currentYear } from '$lib/year'
import { NODE_ENV } from '$env/static/private'
import { initializeFirebaseApp, verifyIdToken } from './firebase'
import { findOrCreateUser, generateJwt } from './registration'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    initializeFirebaseApp()

    const params = await request.formData()
    const idToken = params.get('idToken') as string

    const uid = await verifyIdToken(idToken)

    if (uid) {
      const user = await findOrCreateUser(uid)
      const jwt = await generateJwt(user)

      cookies.set('token', jwt, {
        maxAge: 2 * 7 * 24 * 60 * 60,
        secure: NODE_ENV !== 'development',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
      })

      throw redirect(302, `/${currentYear()}`)
    } else {
      throw redirect(302, '/')
    }
  },
}
