import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { z } from 'zod'
import type { TmdbShowSchema } from '../../schema'
import { ShowResultsPaginatedSchema } from '../../schema'
import { ShowSchema } from '../../schema'

import {
	addPublicUserShow,
	removePublicUserShow,
} from '../lib/services/userShows'
import { useToast } from '../lib/store'

const Show = ({
	show,
	userShow,
}: {
	show: z.infer<typeof TmdbShowSchema> | z.infer<typeof ShowSchema>
	userShow: boolean | undefined
}) => {
	const [showBg, setShowBg] = useState(false)
	const addMessage = useToast((store) => store.addMessage)
	const queryClient = useQueryClient()
	const addUserShowMutation = useMutation({
		mutationFn: (tmdbShow: z.infer<typeof TmdbShowSchema>) => {
			return addPublicUserShow(tmdbShow)
		},
		onError: (error: Error) => {
			addMessage({ type: 'error', text: error.message })
		},
		onSuccess: (data) => {
			addMessage({ type: 'info', text: `${data.name} added!` })
			const prevShows = ShowResultsPaginatedSchema.parse(
				queryClient.getQueryData(['userShows'])
			)
			queryClient.setQueryData(['userShows'], () => {
				return {
					...prevShows,
					pages: [
						{
							...prevShows.pages[0],
							items: [data, ...prevShows.pages[0].items],
						},
						...prevShows.pages.slice(1, prevShows.pages.length),
					],
				}
			})
		},
	})
	const removeUserShowMutation = useMutation({
		mutationFn: (userShow: z.infer<typeof ShowSchema>) => {
			return removePublicUserShow(userShow)
		},
		onSuccess: () => {
			addMessage({ type: 'info', text: `${show.name} deleted!` })
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['userShows'] })

			const prevShows = ShowResultsPaginatedSchema.parse(
				queryClient.getQueryData(['userShows'])
			)
			queryClient.setQueryData(['userShows'], () => {
				return {
					...prevShows,
					pages: prevShows.pages.map((page) => {
						return {
							...page,
							items: page.items.filter((item) => item.tmdb_id !== show.tmdb_id),
						}
					}),
				}
			})
			return { prevShows }
		},
		onError: (error: Error, _: never, context: any) => {
			addMessage({ type: 'error', text: error.message })
			queryClient.setQueryData(['userShows'], context.prevShows)
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: ['userShows'] })
		},
	})
	const handleAdd = () => {
		addUserShowMutation.mutate(show)
	}
	const handleRemove = () => {
		removeUserShowMutation.mutate(ShowSchema.parse(show))
	}
	return (
		<article className="drop-shadow-ld bg-blur-lg relative mx-auto flex w-[300px] flex-col justify-center overflow-hidden rounded-xl bg-slate-300">
			{userShow ? (
				<button
					onClick={handleRemove}
					className="absolute right-1 top-1 z-10 hover:scale-110 "
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="white"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			) : (
				<button
					onClick={handleAdd}
					className="absolute right-1 top-1 z-10 hover:scale-110 "
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="white"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
			)}
			{addUserShowMutation.isLoading && (
				<div className="absolute z-20 flex h-full w-full justify-center bg-black bg-opacity-60">
					<Image
						src="/loader.svg"
						height={100}
						width={100}
						className=""
						alt="loading"
					/>
				</div>
			)}
			<div className="relative h-[500px] ">
				<Image
					src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
					alt={show.name}
					fill
					className="object-cover"
					onMouseEnter={() => setShowBg(true)}
					onMouseLeave={() => setShowBg(false)}
					sizes="(max-width: 768px) 100vw,
						(max-width: 1200px) 50vw,
						33vw"
				/>
				<p className="absolute bottom-2 w-full text-center text-xl font-semibold text-white drop-shadow-xl">
					{show.name}
				</p>
				{showBg && show.backdrop_path
					? createPortal(
							<div className="fixed top-0 h-full w-full">
								{
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
										alt=""
										className="active: h-full w-full object-cover blur-xl"
									/>
								}
							</div>,
							document.body
					  )
					: null}
			</div>
		</article>
	)
}

export default Show
