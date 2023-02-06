import Link from 'next/link'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => (
	<div className=" flex h-screen w-screen flex-col pt-16">
		<nav className="absolute top-5 z-10 flex w-full items-center justify-center gap-4">
			<Link
				href="/"
				className="rounded-md bg-white bg-opacity-70 p-2 font-medium transition-all duration-200 hover:bg-opacity-100"
			>
				Home
			</Link>
			<Link
				href="/shows"
				className="rounded-md bg-white bg-opacity-70 p-2 font-medium transition-all duration-200 hover:bg-opacity-100"
			>
				Popular Shows
			</Link>
		</nav>
		<div className="z-10">{children}</div>
		<div className="fixed top-0 h-screen w-screen bg-gradient-to-b from-blue-900 to-[#15162c] bg-fixed"></div>
	</div>
)

export default Layout
