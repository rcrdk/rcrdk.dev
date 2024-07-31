import type { AppProps } from 'next/app'

import { ThemeProvider } from '@/context/theme'
import { darkTheme, lightTheme } from '@/styles'
import { globalStyles } from '@/styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			storageKey="@RCRDK:theme"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}
		>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
