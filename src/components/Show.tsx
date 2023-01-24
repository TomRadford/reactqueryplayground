import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
const Show = ({
	show,
}: {
	show: { name: string; backdrop_path: string; poster_path: string }
}) => {
	const [showBg, setShowBg] = useState(false)
	return (
		<div className="w-full">
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
					{showBg
						? createPortal(
								<div className="fixed top-0 h-full w-full">
									<img
										src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
										alt=""
										className="active: h-full object-cover blur-xl"
									/>
								</div>,
								document.body
						  )
						: null}
				</div>
			</article>
		</div>
	)
}

export default Show
