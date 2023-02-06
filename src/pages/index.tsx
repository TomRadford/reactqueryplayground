import { type NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import SearchBox from '../components/Search'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Learning React Query</title>
				<meta name="description" content="React Query Fun!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<main className="flex w-screen flex-col gap-12 px-4 py-16">
					<h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						What are you{' '}
						<span className="text-[hsl(212,93%,61%)]">watching</span>?
					</h1>
					<div className="flex w-full justify-center">
						<SearchBox />
					</div>
				</main>
			</Layout>
		</>
	)
}

export default Home
