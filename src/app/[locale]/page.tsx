import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Contact } from '@/app/[locale]/sections/contact'
import { Education } from '@/app/[locale]/sections/education'
import { Experiences } from '@/app/[locale]/sections/experiences'
import { Hero } from '@/app/[locale]/sections/hero'
import { Skills } from '@/app/[locale]/sections/skills'
import { Header } from '@/components/common/header'
import { Nav } from '@/components/common/nav'
import { Screensaver } from '@/components/common/screensaver'
import { ScrollStart } from '@/components/common/scroll-start'
import { SpecialDates } from '@/components/common/special-dates'
import { GameModalContents } from '@/components/game/game-modal-contents'
import { Anchor } from '@/components/ui/anchor'
import { Container } from '@/components/ui/container'
import { FULL_DATES } from '@/config/dates'
import type { LocalesType } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { yearsFromThen } from '@/lib/dayjs'
import { env } from '@/lib/env'
import { trackServerEvent } from '@/services/mixpanel'

export type MetadataProps = {
	params: Promise<{ locale: LocalesType }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const { locale } = await params
	const __ = await getTranslations('Seo')

	return {
		title: __('title'),
		description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
		keywords: __.raw('keywords'),
		openGraph: {
			title: __('title'),
			description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
			url: `${env.NEXT_PUBLIC_APP_URL}/${locale}`,
			siteName: 'Ricardo Augusto Kowalski',
			images: [
				{
					url: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image.jpg`,
					width: 1200,
					height: 630,
					alt: __('title'),
				},
			],
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: __('title'),
			description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
			images: [`${env.NEXT_PUBLIC_APP_URL}/twitter-image.jpg`],
		},
		alternates: {
			canonical: `${env.NEXT_PUBLIC_APP_URL}/${locale}`,
			languages: {
				en: `${env.NEXT_PUBLIC_APP_URL}/en`,
				'pt-BR': `${env.NEXT_PUBLIC_APP_URL}/pt-br`,
			},
		},
	}
}

export type Props = {
	params: Promise<{ locale: LocalesType }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params

	const isValidLocaleSlug = routing.locales.includes(locale)

	if (isValidLocaleSlug)
		trackServerEvent('page_view', {
			page: `home-${locale.split('-')[0]}`,
			url: `/${locale}`,
		})

	return (
		<div className="layout:flex-row layout:items-start relative flex flex-col items-center">
			<Header />
			<Nav slot="page" />

			<main className="layout:self-stretch flex w-screen max-w-screen grow">
				<Container
					size="center"
					sideSpacing="lg"
					className="xs:pb-18 layout:pb-0 my-auto pb-14 sm:pb-20"
					classNameCenter="divide-y divide-black/10 sm:divide-y-0 dark:divide-white/15"
				>
					<Anchor id="about" />
					<Hero />

					<Anchor id="experiences" />
					<Experiences />

					<Anchor id="education" />
					<Education />

					<Anchor id="skills" />
					<Skills />

					<Anchor id="contact" />
					<Contact />
				</Container>
			</main>

			<ScrollStart />
			<Screensaver />
			<SpecialDates />
			<GameModalContents />
		</div>
	)
}
