import Head from 'next/head'
import Layout from '../components/Layout'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPopularShows } from '../lib/services/shows'
import Show from '../components/Show'
import React from 'react'
import { useInView } from 'react-intersection-observer'

const ShowsPage = () => {
	// const [page, setPage] = useState(1)
	const { inView, ref } = useInView()
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ['popularShows'],
		queryFn: fetchPopularShows,
		getNextPageParam: (lastPage, pages) => lastPage.page + 1,
	})

	if (isFetching) {
		return (
			<Layout>
				<p>loading</p>
			</Layout>
		)
	}

	// if (isError) {
	// 	return <p>Error</p>
	// }

	if (inView) {
		fetchNextPage()
	}

	return (
		<Layout>
			<Head>
				<title>Popular shows</title>
			</Head>
			<main className="  justify-center">
				<h1 className=" top-20 text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
					Popular shows!
				</h1>
				<div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
					{/* <button onClick={() => fetchNextPage()}>more!</button> */}
				</div>
			</main>
		</Layout>
	)
}

export default ShowsPage
