import { redirect } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { SignJWT } from 'jose'
import { prisma } from '$lib/prisma'
import { JWT_SECRET } from '$env/static/private'
import type { Actions } from './$types'

function cookieExpires(): Date {
  const date = new Date()
  date.setDate(date.getDate() + 14)

  return date
}

export const actions: Actions = {
  default: async ({ cookies }) => {
    const user = await prisma.user.create({ data: { uuid: nanoid(10) } })
    const jwt = await new SignJWT({ uuid: user.uuid })
      .setProtectedHeader({ alg: 'HS512' })
      .setIssuedAt()
      .setIssuer('MOTY')
      .setExpirationTime('2weeks')
      .sign(new TextEncoder().encode(JWT_SECRET))

    cookies.set('token', jwt, { expires: cookieExpires() })

    throw redirect(302, '/2023')
  },
}
