import '@/styles/globals.css'
import '@/styles/tetris.css'

import type { Metadata, Viewport } from 'next'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

import profilePicture from '@/assets/avatar.jpg'
import { KonamiCodeGameTask } from '@/components/game/tasks/konami-code-task'
import { LocaleGameTask } from '@/components/game/tasks/locale-task'
import { Providers } from '@/components/providers'
import { FULL_DATES } from '@/config/dates'
import { LINKS } from '@/config/links'
import type { LocalesType } from '@/i18n/config'
import { yearsFromThen } from '@/lib/dayjs'
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

export default async function RootLayout({ children }: Readonly<Props>) {
	const locale = (await getLocale()) as LocalesType
	const messages = await getMessages()
	const __ = await getTranslations('Seo')

	const shouldEnableGA = process.env.NODE_ENV === 'production' && !!env.NEXT_PUBLIC_GOOGLE_ANALYTICS

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Ricardo Augusto Kowalski',
		birthDate: '1996-03-03',
		image: `${env.NEXT_PUBLIC_APP_URL}${profilePicture.src}`,
		url: env.NEXT_PUBLIC_APP_URL,
		description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
		sameAs: [LINKS.github, LINKS.behance, LINKS.linkedIn],
		jobTitle: __('jobTitle'),
		worksFor: {
			'@type': 'Organization',
			name: 'MySide',
			url: 'https://myside.com.br',
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Timbó',
			addressRegion: 'Santa Catarina',
			addressCountry: 'BR',
		},
		knowsAbout: [
			'Front-end Development',
			'React',
			'Next.js',
			'TypeScript',
			'Node.js',
			'JavaScript',
			'PHP',
			'Laravel',
			'Web Development',
			'UI/UX Design',
			'Responsive Design',
			'Web Performance',
			'Accessibility',
		],
		alumniOf: {
			'@type': 'Organization',
			name: 'Uniasselvi',
			url: 'https://portal.uniasselvi.com.br/',
		},
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Front-End Developer',
			occupationLocation: {
				'@type': 'City',
				name: 'Timbó',
				addressRegion: 'Santa Catarina',
				addressCountry: 'BR',
			},
		},
	}

	return (
		<html
			lang={locale}
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full scroll-smooth bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="text-content-light dark:text-content-dark layout:overflow-y-auto layout:snap-y layout:snap-mandatory layout:h-dvh w-full overflow-x-hidden scroll-smooth">
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

				<Providers i18n={{ messages, locale }} shouldEnableGA={shouldEnableGA}>
					<LocaleGameTask />
					<KonamiCodeGameTask />
					{children}
				</Providers>
			</body>
		</html>
	)
}
