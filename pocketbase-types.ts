/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
	PublicShows = 'public_shows',
	Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type PublicShowsRecord = {
	backdrop_path?: string
	name?: string
	overview?: string
	poster_path?: string
	tmdb_id?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type PublicShowsResponse = PublicShowsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	public_shows: PublicShowsRecord
	users: UsersRecord
}
