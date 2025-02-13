import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

import { env } from '@/lib/env'

type Props = {
	children: React.ReactNode
}

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	applicationName: 'Ricardo Augusto Kowalski',
	authors: { name: 'Ricardo Augusto Kowalski', url: env.NEXT_PUBLIC_APP_URL },
	generator: 'Next.js',
	formatDetection: { telephone: false },
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
	],
}

export default async function RootLayout({ children }: Props) {
	const messages = await getMessages()

	const cookieStore = await cookies()
	const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en'

	const shouldEnableGA = process.env.NODE_ENV === 'production' && !!env.NEXT_PUBLIC_GOOGLE_ANALYTICS

	return (
		<html
			lang={locale}
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full scroll-smooth bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="text-content-light dark:text-content-dark layout:overflow-y-auto layout:snap-y layout:snap-mandatory layout:h-dvh w-full overflow-x-hidden scroll-smooth">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="data-mode">{children}</ThemeProvider>

					{shouldEnableGA && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
