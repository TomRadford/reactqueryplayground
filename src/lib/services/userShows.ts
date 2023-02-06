import axios from 'axios'
import type { PublicShowsResponse } from '../../../pocketbase-types.js'
import { clientEnv } from '../../env/schema.mjs'

const getUrl = () => {
	if (typeof clientEnv.NEXT_PUBLIC_POCKETBASE_URI === 'string') {
		return clientEnv.NEXT_PUBLIC_POCKETBASE_URI
	} else throw new Error('Pocketbase Uri missing')
}

export const getPublicUserShows = async (): Promise<PublicShowsResponse> => {
	const res = await axios.get(
		`${getUrl()}/api/collections/public_shows/records`
	)
	return res.data as PublicShowsResponse
}
