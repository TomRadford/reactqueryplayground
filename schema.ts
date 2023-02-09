import z from 'zod'

export const TmdbShowSchema = z.object({
	backdrop_path: z.string().optional().nullable(),
	name: z.string(),
	overview: z.string(),
	poster_path: z.string().optional().nullable(),
	tmdb_id: z.string(),
})

export const ShowSchema = TmdbShowSchema.extend({
	id: z.string(),
	created: z.string(),
	updated: z.string(),
	collectionId: z.string(),
})

export const ShowResultsSchema = z.object({
	page: z.number(),
	totalPages: z.number(),
	items: z.array(z.union([ShowSchema, TmdbShowSchema])),
})

export const ShowResultsPaginatedSchema = z.object({
	pageParams: z.array(z.union([z.null(), z.number(), z.undefined()])),
	pages: z.array(ShowResultsSchema),
})
