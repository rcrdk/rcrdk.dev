import type { ReactNode } from 'react'

import '@/styles/globals.css'
import '@/styles/tetris.css'

import type { Metadata, Viewport } from 'next'
import { getMessages, getTranslations } from 'next-intl/server'

import profilePicture from '@/assets/avatar.jpg'
import { UmamiAnalytics } from '@/components/analytics/umami'
import { KonamiCodeGameTask } from '@/components/game/tasks/konami-code-task'
import { LocaleGameTask } from '@/components/game/tasks/locale-task'
import { Providers } from '@/components/providers'
import { FULL_DATES } from '@/config/dates'
import { getSiteJsonLd } from '@/config/json-ld'
import { LINKS } from '@/config/links'
import { getCurrentLocale } from '@/i18n/get-current-locale'
import { yearsFromThen } from '@/lib/dayjs'
import { env } from '@/lib/env'

interface RootLayoutProps {
	children: ReactNode
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

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
	const locale = await getCurrentLocale()
	const messages = await getMessages()
	const __ = await getTranslations('Seo')

	const jsonLd = getSiteJsonLd({
		url: env.NEXT_PUBLIC_APP_URL,
		name: 'Ricardo Augusto Kowalski',
		description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
		jobTitle: __('jobTitle'),
		image: `${env.NEXT_PUBLIC_APP_URL}${profilePicture.src}`,
		sameAs: [LINKS.github, LINKS.behance, LINKS.linkedIn],
		locale,
	})

	return (
		<html
			lang={locale}
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full scroll-smooth bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="text-content-light dark:text-content-dark layout:overflow-y-auto layout:snap-y layout:snap-mandatory layout:h-dvh w-full overflow-x-hidden scroll-smooth">
				<UmamiAnalytics />
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

				<Providers i18n={{ messages, locale }}>
					<LocaleGameTask />
					<KonamiCodeGameTask />

					{children}
				</Providers>
			</body>
		</html>
	)
}
