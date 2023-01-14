import { redirect } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { SignJWT } from 'jose'
import { prisma } from '$lib/prisma'
import { currentYear } from '$lib/year'
import { JWT_SECRET, NODE_ENV } from '$env/static/private'
import { initializeFirebaseApp, verifyIdToken } from './firebase'
import type { User } from '@prisma/client'
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

async function findOrCreateUser(uid: string) {
  const existing = await prisma.googleAccount.findUnique({ where: { uid }, include: { user: true } })

  if (existing) {
    return existing.user
  } else {
    return await prisma.user.create({ data: { uuid: nanoid(10), googleAccount: { create: { uid } } } })
  }
}

async function generateJwt({ uuid }: User) {
  return await new SignJWT({ uuid })
    .setProtectedHeader({ alg: 'HS512' })
    .setIssuedAt()
    .setIssuer('MOTY')
    .setExpirationTime('2weeks')
    .sign(new TextEncoder().encode(JWT_SECRET))
}
