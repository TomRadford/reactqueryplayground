import Head from 'next/head'
import Layout from '../../components/Layout'

import ShowsViewer from '../../components/ShowsViewer'

const ShowsPage = () => {
	return (
		<>
			<Head>
				<title>User shows</title>
			</Head>
			<Layout>
				<main className="  justify-center">
					<h1 className=" top-20 text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						Popular shows!
					</h1>
					<ShowsViewer userShows />
				</main>
			</Layout>
		</>
	)
}

export default ShowsPage
