import { redirect } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { SignJWT } from 'jose'
import { prisma } from '$lib/prisma'
import { JWT_SECRET, NODE_ENV } from '$env/static/private'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ cookies }) => {
    const user = await prisma.user.create({ data: { uuid: nanoid(10) } })
    const jwt = await new SignJWT({ uuid: user.uuid })
      .setProtectedHeader({ alg: 'HS512' })
      .setIssuedAt()
      .setIssuer('MOTY')
      .setExpirationTime('2weeks')
      .sign(new TextEncoder().encode(JWT_SECRET))

    cookies.set('token', jwt, {
      maxAge: 2 * 7 * 24 * 60 * 60,
      secure: NODE_ENV !== 'development',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    })

    throw redirect(302, '/2023')
  },
}
