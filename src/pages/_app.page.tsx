import * as TooltipBase from '@radix-ui/react-tooltip'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { NextIntlClientProvider } from 'next-intl'

import { ThemeProvider } from '@/context/theme'
import { darkTheme, lightTheme } from '@/styles'
import { globalStyles } from '@/styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
	const { locale } = useRouter()

	return (
		<NextIntlClientProvider
			locale={locale}
			timeZone="America/Sao_Paulo"
			messages={pageProps.messages}
		>
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
				<TooltipBase.Provider delayDuration={0}>
					<Component {...pageProps} />
				</TooltipBase.Provider>
			</ThemeProvider>
		</NextIntlClientProvider>
	)
}
