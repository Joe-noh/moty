import { t } from '$lib/trpc/t'
import { movieRouter } from './routes/movie'

export const router = t.mergeRouters(movieRouter)

export type Router = typeof router
