import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPopularShows } from '../lib/services/shows'
import Show from '../components/Show'
import React, { forwardRef } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { fetchPublicUserShows } from '../lib/services/userShows'

const ShowSkeleton = forwardRef((_, ref: React.Ref<HTMLElement>) => {
	return (
		<article
			ref={ref}
			className="drop-shadow-ld bg-blur-lg mx-auto flex w-[300px]  flex-col justify-center overflow-hidden rounded-xl bg-slate-300"
		>
			<div className="relative h-[500px] animate-pulse bg-gray-500"></div>
		</article>
	)
})

ShowSkeleton.displayName = 'ShowSkeleton'

const ShowsViewer = ({ userShows }: { userShows?: boolean }) => {
	const { inView, ref } = useInView()
	const { data, fetchNextPage, isLoading } = useInfiniteQuery({
		queryKey: [userShows ? 'userShows' : 'popularShows'],
		queryFn: userShows ? fetchPublicUserShows : fetchPopularShows,
		refetchOnMount: false,
		getNextPageParam: (lastPage, pages) => lastPage.page + 1,
	})

	if (isLoading) {
		return (
			<Image
				src="/loader.svg"
				height={100}
				width={100}
				className="mx-auto mt-10"
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
						<ShowSkeleton ref={ref} />
						{[...(new Array(7) as undefined[])].map((_, i) => (
							<ShowSkeleton key={i} />
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
