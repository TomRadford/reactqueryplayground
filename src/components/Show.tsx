import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { z } from 'zod'
import type { TmdbShowSchema } from '../../schema'
import type { ShowSchema } from '../../schema'

const Show = ({
	show,
}: {
	show: z.infer<typeof TmdbShowSchema> | z.infer<typeof ShowSchema>
}) => {
	const [showBg, setShowBg] = useState(false)
	return (
		<article className="drop-shadow-ld bg-blur-lg mx-auto flex w-[300px]  flex-col justify-center overflow-hidden rounded-xl bg-slate-300">
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
