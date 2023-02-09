/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { ShowResultsSchema, ShowSchema } from '../../../schema'
import { env } from '../../env/client.mjs'

type Item = {
	backdrop_path: string
	collectionId: string
	collectionName: string
	created: string
	id: string
	name: string
	overview: string
	poster_path: string
	tmdb_id: string
	updated: string
}

type ApiResult = {
	page: number
	perPage: number
	totalItems: number
	totalPages: number
	items: Item[]
}

export const fetchPublicUserShows = async ({
	pageParam = 1,
}): Promise<z.infer<typeof ShowResultsSchema>> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { data }: { data: ApiResult } = await axios.get(
		`${env.NEXT_PUBLIC_POCKETBASE_URI}/api/collections/public_shows/records?page=${pageParam}`
	)

	const items = z.array(ShowSchema).parse(
		data.items.map((show: { id: string }) => {
			return {
				...show,
				tmdb_id: show.id ? String(show.id) : nanoid(),
			}
		})
	)
	const showResults: z.infer<typeof ShowResultsSchema> = {
		page: data.page,
		totalPages: data.totalPages,
		items,
	}

	return ShowResultsSchema.parse(showResults)
}
