import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'
import { jwtVerify } from 'jose'
import { prisma } from '$lib/prisma'
import { JWT_SECRET } from '$env/static/private'

export async function createContext(event: RequestEvent) {
  const token = event.cookies.get('token')

  if (token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(token, secret, { issuer: 'MOTY' })
      const user = await prisma.user.findUniqueOrThrow({ where: { uuid: payload.uuid as string } })

      return { user }
    } catch {
      return {}
    }
  } else {
    return {}
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
