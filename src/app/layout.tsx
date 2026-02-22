import '@/styles/globals.css'
import '@/styles/tetris.css'

import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { getMessages } from 'next-intl/server'

import { Providers } from '@/components/providers'
import { env } from '@/lib/env'

const DEFAULT_LOCALE = 'en'

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

export default async function RootLayout({ children }: Readonly<Props>) {
	const messages = await getMessages()

	const cookieStore = await cookies()
	const locale = cookieStore.get('NEXT_LOCALE')?.value ?? DEFAULT_LOCALE

	const shouldEnableGA = process.env.NODE_ENV === 'production' && !!env.NEXT_PUBLIC_GOOGLE_ANALYTICS

	return (
		<html
			lang={locale}
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full scroll-smooth bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="text-content-light dark:text-content-dark layout:overflow-y-auto layout:snap-y layout:snap-mandatory layout:h-dvh w-full overflow-x-hidden scroll-smooth">
				<Providers i18n={{ messages, locale }} shouldEnableGA={shouldEnableGA}>
					{children}
				</Providers>
			</body>
		</html>
	)
}
