import { prisma } from '$lib/prisma'
import { findOrCreateUser, generateJwt } from './registration'

describe('findOrCreateUser', () => {
  beforeEach(async () => {
    await prisma.user.create({ data: { uuid: 'abcde', googleAccount: { create: { uid: '12345'} }} })
  })

  it('finds existing user by GoogleAccount uid', async () => {
    const user = await findOrCreateUser('12345')

    expect(user.uuid).toBe('abcde')
    expect(await prisma.user.count()).toBe(1)
  })

  it('creates a new user', async () => {
    const user = await findOrCreateUser('67890')

    expect(user.uuid).not.toBe('abcde')
    expect(await prisma.user.count()).toBe(2)
  })
})

describe('generateJwt', () => {
  it('returns JWT', async () => {
    const user = await prisma.user.create({ data: { uuid: 'abcde' }})
    const jwt = await generateJwt(user)

    expectTypeOf(jwt).toBeString()
  })
})
