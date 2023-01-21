import { t } from '$lib/trpc/t'
import { movieRouter } from './routes/movie'
import { rankingRouter } from './routes/ranking'

export const router = t.mergeRouters(movieRouter, rankingRouter)

export type Router = typeof router
