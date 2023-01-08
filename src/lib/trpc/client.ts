import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { Router } from '$lib/trpc/router'

export const trpc = createTRPCProxyClient<Router>({
  links: [httpBatchLink({ url: '/trpc' })],
})
