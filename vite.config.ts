import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [sveltekit()],
  test: {
    globals: true,
    environment: 'vprisma',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['vitest-environment-vprisma/setup', 'test/setup.ts'],
    environmentOptions: {
      vprisma: {
        databaseUrl: 'postgres://moty:password@localhost:5433/moty_test',
      },
    },
  },
}

export default config
