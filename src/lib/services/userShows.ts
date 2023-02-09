/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { Axios, AxiosError } from 'axios'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import type { TmdbShowSchema } from '../../../schema'
import { ShowResultsSchema, ShowSchema } from '../../../schema'
import { env } from '../../env/client.mjs'

type ShowItem = {
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

type ApiShowsResult = {
	page: number
	perPage: number
	totalItems: number
	totalPages: number
	items: ShowItem[]
}

export const fetchPublicUserShows = async ({
	pageParam = 1,
}): Promise<z.infer<typeof ShowResultsSchema>> => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { data }: { data: ApiShowsResult } = await axios.get(
		`${env.NEXT_PUBLIC_POCKETBASE_URI}/api/collections/public_shows/records?page=${pageParam}&sort=-created`
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

type UserShowItem = {
	backdrop_path: string
	collectionId: string
	collectionName: string
	created: string
	id?: string
	name?: string
	overview?: string
	poster_path?: string
	tmdb_id?: string
	updated?: string
}

type ApiUserShowResult = {
	page: number
	perPage: number
	totalItems: number
	totalPages: number
	items: UserShowItem[]
}

export const addPublicUserShow = async (
	show: z.infer<typeof TmdbShowSchema>
): Promise<z.infer<typeof ShowSchema>> => {
	const { data: existingShow }: { data: ApiUserShowResult } = await axios.get(
		`${env.NEXT_PUBLIC_POCKETBASE_URI}/api/collections/public_shows/records?filter=(tmdb_id='${show.tmdb_id}')`
	)
	if (existingShow.items.length > 0) {
		throw new Error('Show already exists')
	}
	const { data }: { data: UserShowItem } = await axios.post(
		`${env.NEXT_PUBLIC_POCKETBASE_URI}/api/collections/public_shows/records`,
		show
	)
	const newUserShow = ShowSchema.parse(data)
	return newUserShow
}

export const removePublicUserShow = async (
	show: z.infer<typeof ShowSchema>
): Promise<boolean> => {
	await axios.delete(
		`${env.NEXT_PUBLIC_POCKETBASE_URI}/api/collections/public_shows/records/${show.id}`
	)
	return true
}
