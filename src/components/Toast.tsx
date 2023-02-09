import { useEffect, useState } from 'react'
import type { z } from 'zod'
import type { MessageSchema } from '../lib/store'
import { useToast } from '../lib/store'

const ToastMessage = ({
	message,
}: {
	message: z.infer<typeof MessageSchema>
}) => {
	const removeLast = useToast((state) => state.removeLast)
	const messages = useToast((state) => state.messages)
	const displayTime = 2000

	useEffect(() => {
		const timeout = setTimeout(() => {
			removeLast()
		}, displayTime)
		console.log(timeout)
		return () => clearTimeout(timeout)
	}, [messages])

	// animate-[wiggle_1s_ease-in-out_linear]`
	return (
		<div
			className={`flex h-24 w-72 animate-[animateIn_0.5s_ease-in-out]  items-center justify-center rounded-lg ${
				message.type === 'error' ? `bg-red-700` : `bg-slate-800`
			}`}
		>
			<p className="text-white">{message.text}</p>
		</div>
	)
}

const ToastContainer = () => {
	const messages = useToast((state) => state.messages)

	return (
		<div className="fixed bottom-2 right-2 z-40 flex flex-col-reverse gap-1">
			{messages.map((message, i) => (
				<ToastMessage key={i} message={message} />
			))}
		</div>
	)
}

export default ToastContainer
