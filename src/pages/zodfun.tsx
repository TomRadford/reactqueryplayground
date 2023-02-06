import { useState } from 'react'
import z from 'zod'
export const andFormatter = new Intl.ListFormat('en', {
	style: 'long',
	type: 'conjunction',
})

const libs = ['React', 'Svelte', 'Vue'] as const

const UserSchema = z.object({
	id: z.union([z.string(), z.number()]),
	username: z.string().min(5, { message: 'Name too short' }),
	age: z.number().optional(),
	birthday: z
		.date()
		.min(new Date('2000-01-01'), { message: 'Too old!' })
		.max(new Date('2010-01-01'), { message: 'too young!' }),
	isDev: z.boolean().default(true),
	lib: z.enum(libs).default('React'),
	projects: z.array(z.string()).nonempty(),
	home: z
		.tuple([z.number().int(), z.string(), z.number().gte(15)])
		.rest(z.string()),
	car: z.discriminatedUnion('hasCar', [
		z.object({ hasCar: z.literal(true), carType: z.string() }),
		z.object({ hasCar: z.literal(false) }),
	]),
	gmail: z
		.string()
		.email()
		.refine((val) => val.endsWith('@gmail.com'), {
			message: 'Email must end with @gmail.com',
		})
		.optional(),
})

//Extract type
type User = z.infer<typeof UserSchema>

// can also use for map/set
const UserRecordSchema = z.record(z.string(), UserSchema)
type UserRecord = z.infer<typeof UserRecordSchema>

const users: UserRecord = {
	hi: {
		id: 2,
		username: 'lol',
		birthday: new Date('2001-01-05'),
		isDev: true,
		lib: 'React',
		projects: ['gi'],
		home: [5.5, 'd', 18, 'sdfdsfs'],
		car: { hasCar: false },
	},
	lol: {
		id: 2,
		username: 'lol',
		birthday: new Date('2001-01-05'),
		isDev: true,
		lib: 'React',
		projects: ['gi'],
		home: [5.5, 'd', 18, 'sdfdsfs'],
		car: { hasCar: false },
	},
}

const PromiseSchema = z.promise(z.string())

const p: PromiseType = Promise.resolve('sd')

type PromiseType = z.infer<typeof PromiseSchema>

const ZodFunPage = () => {
	const [val, setVal] = useState('')
	const [err, setErr] = useState('')
	if (err.length > 0) {
		setTimeout(() => {
			setErr('')
		}, 3000)
	}
	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const user = {
						id: 1,
						username: val,
						birthday: new Date('2001-01-01'),
						// willremove: 'dasfd',
						projects: ['MemeMaker'],
						home: [1, '5', 15, 'sdf', 'sdfdf', 'sdfsd'],
						car: { hasCar: true, carType: 'Honda' },
						gmail: 'swag@gmail.com',
					}

					try {
						// console.log(UserSchema.partial().parse(user))
						//setting new user could use parse
						const newUser = UserSchema.parse(user)
						console.log(newUser)
					} catch (e) {
						if (e instanceof z.ZodError) {
							if (e.issues.length > 0) {
								setErr(
									andFormatter.format(e.issues.map((issue) => issue.message))
								)
							}
						}
					}
				}}
			>
				<input
					className="border-2 border-solid border-cyan-500"
					type="text"
					value={val}
					onChange={(e) => setVal(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			{err && <div className=" bg-red-200">Error: {err}</div>}
		</>
	)
}

export default ZodFunPage
