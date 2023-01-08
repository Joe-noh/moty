import type { Handle } from '@sveltejs/kit'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { router } from '$lib/trpc/router'
import { createContext } from '$lib/trpc/context'

const endpoint = '/trpc'

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith(endpoint)) {
    return await fetchRequestHandler({
      endpoint,
      router,
      req: event.request,
      createContext: () => createContext(event),
    })
  } else {
    return resolve(event)
  }
}
