import axios from 'axios'
import type {
	PublicShowsRecord,
	PublicShowsResponse,
} from '../../../pocketbase-types.js'

import { clientEnv } from '../../env/schema.mjs'
const getUrl = (entity: string) => {
	if (typeof clientEnv.NEXT_PUBLIC_TMDB_KEY === 'string') {
		return `https://api.themoviedb.org/3/${entity}?api_key=${clientEnv.NEXT_PUBLIC_TMDB_KEY}`
	} else throw new Error('API key missing')
}
export const fetchPopularShows = async ({
	pageParam = 1,
}): Promise<PublicShowsRecord> => {
	const res = await axios.get(
		`${getUrl(`/tv/popular`)}&language=en-US&page=${pageParam}`
	)

	return res.data as PublicShowsRecord
}
