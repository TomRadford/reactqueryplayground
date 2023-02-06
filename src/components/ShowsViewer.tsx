import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPopularShows } from '../lib/services/shows'

import Show from '../components/Show'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const ShowsViewer = ({ userShows }: { userShows?: boolean }) => {
	const { inView, ref } = useInView()
	const { data, fetchNextPage, isLoading } = useInfiniteQuery({
		queryKey: [userShows ? 'userShows' : 'popularShows'],
		queryFn: userShows ? fetchUserShows : fetchPopularShows,

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

	return (
		<div className="flex flex-col items-center">
			<div className="mx-auto mt-10 grid max-w-[1450px] grid-cols-1 gap-3 md:mx-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{data?.pages.map((group, i) => (
					<>
						<React.Fragment key={i}>
							{group.results.map((show) => (
								<Show show={show} key={show.id} />
							))}
						</React.Fragment>
					</>
				))}

				<div ref={ref}></div>
			</div>
		</div>
	)
}

export default ShowsViewer
