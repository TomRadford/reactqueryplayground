import { type AppType } from 'next/dist/shared/lib/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../styles/globals.css'
import { queryClient } from '../lib/client'

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
export default MyApp
