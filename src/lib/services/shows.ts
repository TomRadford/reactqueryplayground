import axios from 'axios'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { ShowResultsSchema, TmdbShowSchema } from '../../../schema'

type ApiResult = {
	page: number
	results: Result[]
	total_pages: number
	total_results: number
}

type Result = {
	backdrop_path?: string
	first_air_date: string
	genre_ids: number[]
	id: number
	name: string
	origin_country: string[]
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	vote_average: number
	vote_count: number
}

export const fetchPopularShows = async ({
	pageParam = 1,
}): Promise<z.infer<typeof ShowResultsSchema>> => {
	const { data }: { data: ApiResult } = await axios.get(
		`/api/tv/popular/${pageParam}`
	)
	const items = z.array(TmdbShowSchema).parse(
		data.results.map((show) => {
			return {
				...show,
				tmdb_id: show.id ? String(show.id) : nanoid(),
			}
		})
	)
	const showResults: z.infer<typeof ShowResultsSchema> = {
		page: data.page,
		totalPages: data.total_pages,
		items,
	}

	return ShowResultsSchema.parse(showResults)
}
