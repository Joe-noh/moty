import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'

export async function createContext(event: RequestEvent) {
  return {
    userId: 1, // TODO: fetch from event.request.headers
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
