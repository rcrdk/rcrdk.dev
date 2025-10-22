import '@/styles/globals.css'

import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import profilePicture from '@/assets/avatar.jpg'
import { KonamiCodeGameTask } from '@/components/game/tasks/konami-code-task'
import { LocaleGameTask } from '@/components/game/tasks/locale-task'
import { FULL_DATES } from '@/config/dates'
import { LocalesType, routing } from '@/i18n/routing'
import { yearsFromThen } from '@/lib/dayjs'
import { env } from '@/lib/env'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: LocalesType }>
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params
	const __ = await getTranslations('Seo')

	if (!routing.locales.includes(locale)) return notFound()

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Ricardo Augusto Kowalski',
		birthDate: '1996-03-03',
		image: `${env.NEXT_PUBLIC_APP_URL}${profilePicture.src}`,
		url: env.NEXT_PUBLIC_APP_URL,
		description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
		sameAs: ['https://github.com/rcrdk', 'https://www.behance.net/rcrdk', 'https://www.linkedin.com/in/rcrdk'],
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
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<LocaleGameTask />
			<KonamiCodeGameTask />

			{children}
		</>
	)
}
