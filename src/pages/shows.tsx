import Head from 'next/head'
import Layout from '../components/Layout'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularShows } from '../lib/services/shows'
import Show from '../components/Show'

const ShowsPage = () => {
	const { isLoading, isError, data, error } = useQuery(
		['popularShows'],
		fetchPopularShows
	)

	if (isLoading) {
		return <p>loading</p>
	}

	if (isError) {
		return <p>Error</p>
	}

	console.log(data)

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
					{data.results.map((show) => (
						<Show show={show} key={show.id} />
					))}
				</div>
			</main>
		</Layout>
	)
}

export default ShowsPage
