import '@/styles/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

import { routing } from '@/i18n/routing'
import { env } from '@/lib/env'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: 'pt-br' | 'en' }>
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

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()

	const shouldEnableGA =
		process.env.NODE_ENV === 'production' && !!env.NEXT_PUBLIC_GOOGLE_ANALYTICS

	return (
		<html
			lang={locale}
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="layout:overflow-y-auto layout:snap-y layout:snap-mandatory layout:h-dvh w-full overflow-x-hidden">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="data-mode">{children}</ThemeProvider>

					{shouldEnableGA && (
						<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
					)}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
