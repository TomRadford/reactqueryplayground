// @ts-check

import { clientEnv, serverEnv } from './src/env/schema.mjs'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	/* If trying out the experimental appDir, comment the i18n config out
	 * @see https://github.com/vercel/next.js/issues/41980 */
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		domains: ['image.tmdb.org'],
	},
	async rewrites() {
		return [
			{
				source: '/api/search/tv/:q/:page',
				destination: `https://api.themoviedb.org/3/search/tv?page=:page&query=:q&api_key=${serverEnv.TMDB_KEY}`,
			},
			{
				source: '/api/tv/popular/:page',
				destination: `https://api.themoviedb.org/3/tv/popular?page=:page&api_key=${serverEnv.TMDB_KEY}`,
			},
		]
	},
}
export default config
