import { useEffect } from 'react'
import type { z } from 'zod'
import type { MessageSchema } from '../lib/store'
import { useToast } from '../lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'

const ToastMessage = ({
	message,
}: {
	message: z.infer<typeof MessageSchema>
}) => {
	const removeLast = useToast((state) => state.removeLast)

	const displayTime = 3000

	useEffect(() => {
		const timeout = setTimeout(() => {
			removeLast()
		}, displayTime)
		return () => clearTimeout(timeout)
	})

	return (
		<div
			className={`flex h-24 w-72 items-center  justify-center rounded-lg py-5 px-7 text-center 
      ${message.type === 'error' ? `bg-red-700` : `bg-slate-800`}
			 
      `}
		>
			<p className="text-white">{message.text}</p>
		</div>
	)
}

const ToastContainer = () => {
	const messages = useToast((state) => state.messages)

	return (
		<div className="fixed bottom-2 right-2 z-40 ">
			<div className="flex flex-col gap-1">
				{messages.map((message, i) => (
					<ToastMessage key={nanoid()} message={message} />
				))}
			</div>
		</div>
	)
}

export default ToastContainer
