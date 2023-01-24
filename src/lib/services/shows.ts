import axios from 'axios'

import { clientEnv } from '../../env/schema.mjs'
const getUrl = (entity: string) => {
	if (typeof clientEnv.NEXT_PUBLIC_TMDB_KEY === 'string') {
		return `https://api.themoviedb.org/3/${entity}?api_key=${clientEnv.NEXT_PUBLIC_TMDB_KEY}`
	} else throw new Error('API key missing')
}
export const fetchPopularShows = async ({ queryKey }) => {
	console.log(queryKey)
	const res = await axios.get(getUrl('/tv/popular'))
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return res.data
}
