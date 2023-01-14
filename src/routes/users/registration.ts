import { nanoid } from 'nanoid'
import { SignJWT } from 'jose'
import { prisma } from '$lib/prisma'
import { JWT_SECRET } from '$env/static/private'
import type { User } from '@prisma/client'

export async function findOrCreateUser(uid: string) {
  const existing = await prisma.googleAccount.findUnique({ where: { uid }, include: { user: true } })

  if (existing) {
    return existing.user
  } else {
    return await prisma.user.create({ data: { uuid: nanoid(10), googleAccount: { create: { uid } } } })
  }
}

export async function generateJwt({ uuid }: User) {
  return await new SignJWT({ uuid })
    .setProtectedHeader({ alg: 'HS512' })
    .setIssuedAt()
    .setIssuer('MOTY')
    .setExpirationTime('2weeks')
    .sign(new TextEncoder().encode(JWT_SECRET))
}
