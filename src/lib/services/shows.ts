/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { ShowResultsSchema, TmdbShowSchema } from '../../../schema'

export const fetchPopularShows = async ({
	pageParam = 1,
}): Promise<z.infer<typeof ShowResultsSchema>> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { data } = await axios.get(`/api/tv/popular/${pageParam}`)
	const items = z.array(TmdbShowSchema).parse(
		data.results.map((show: { id: string }) => {
			return {
				...show,
				tmdb_id: show.id ? String(show.id) : nanoid(),
			}
		})
	)
	const showResults: z.infer<typeof ShowResultsSchema> = {
		page: data.page as number,
		totalPages: data.total_pages as number,
		items,
	}

	return ShowResultsSchema.parse(showResults)
}
