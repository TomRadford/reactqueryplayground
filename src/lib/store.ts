import { z } from 'zod'
import { create } from 'zustand'

export const MessageSchema = z.object({
	type: z.union([z.literal('error'), z.literal('info'), z.literal('none')]),
	text: z.string(),
})

type ToastState = {
	messages: z.infer<typeof MessageSchema>[]
	addMessage: (message: z.infer<typeof MessageSchema>) => void
	removeLast: () => void
}

export const useToast = create<ToastState>()((set) => ({
	messages: [],
	addMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	removeLast: () =>
		set((state) => ({
			messages: state.messages.slice(1, state.messages.length),
		})),
}))
