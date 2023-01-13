import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import type { Router } from '$lib/trpc/router'

export const trpc = createTRPCProxyClient<Router>({
  links: [httpBatchLink({ url: '/trpc' })],
  transformer: superjson,
})
