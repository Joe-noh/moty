import { jwtVerify } from 'jose'
import { prisma } from '$lib/prisma'
import { JWT_SECRET } from '$env/static/private'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
  const token = cookies.get('token')

  if (token) {
    const secret = new TextEncoder().encode(JWT_SECRET)

    try {
      const { payload } = await jwtVerify(token, secret, { issuer: 'MOTY' })
      const currentUser = await prisma.user.findUnique({ where: { uuid: payload.uuid as string } })

      return { currentUser }
    } catch (e) {
      return { currentUser: null }
    }
  } else {
    return { currentUser: null }
  }
}
