import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPopularShows } from '../lib/services/shows'

import Show from '../components/Show'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { nanoid } from 'nanoid'

const ShowSkeleton = ({ ref }: { ref?: Element }) => (
	<article
		ref={ref}
		className="drop-shadow-ld bg-blur-lg mx-auto flex w-[300px]  flex-col justify-center overflow-hidden rounded-xl bg-slate-300"
	>
		<div className="relative h-[500px] animate-pulse bg-gray-500"></div>
	</article>
)

const ShowsViewer = ({ userShows }: { userShows?: boolean }) => {
	const { inView, ref } = useInView()
	const { data, fetchNextPage, isLoading } = useInfiniteQuery({
		queryKey: [userShows ? 'userShows' : 'popularShows'],
		queryFn: fetchPopularShows,

		refetchOnMount: false,
		getNextPageParam: (lastPage, pages) => lastPage.page + 1,
	})

	if (isLoading) {
		return (
			<Image
				src="/loader.svg"
				height={100}
				width={100}
				className="mx-auto"
				alt="loading"
			/>
		)
	}

	if (inView) {
		void fetchNextPage()
	}
	const getLoader = () => {
		if (data?.pages && data.pages[0]) {
			if (data?.pages?.length < data?.pages[0]?.totalPages) {
				return (
					<>
						{[...(new Array(8) as undefined[])].map((_, i) => (
							<article
								key={i}
								ref={i === 0 ? ref : undefined}
								className="drop-shadow-ld bg-blur-lg mx-auto flex w-[300px]  flex-col justify-center overflow-hidden rounded-xl bg-slate-300"
							>
								<div className="relative h-[500px] animate-pulse bg-gray-500"></div>
							</article>
						))}
					</>
				)
			}
		} else return <></>
	}
	return (
		<div className="flex flex-col items-center">
			<div className="mx-auto mt-10 grid max-w-[1450px] grid-cols-1 gap-3 md:mx-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{data?.pages.map((group, i) => (
					<>
						<React.Fragment key={i}>
							{group.items.map((show) => (
								<Show show={show} key={show.tmdb_id} />
							))}
						</React.Fragment>
					</>
				))}
				{getLoader()}
			</div>
		</div>
	)
}

export default ShowsViewer
