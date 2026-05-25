import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import { Contact } from '@/app/(landing)/sections/contact'
import { Education } from '@/app/(landing)/sections/education'
import { Experiences } from '@/app/(landing)/sections/experiences'
import { Hero } from '@/app/(landing)/sections/hero'
import { Skills } from '@/app/(landing)/sections/skills'
import { Header } from '@/components/common/header'
import { LazyScreensaver } from '@/components/common/lazy-screensaver'
import { LazySpecialDates } from '@/components/common/lazy-special-dates'
import { Nav } from '@/components/common/nav'
import { ScrollStart } from '@/components/common/scroll-start'
import { LazyGameDialog } from '@/components/game/dialog/lazy-game-dialog'
import { Anchor } from '@/components/ui/anchor'
import { Container } from '@/components/ui/container'
import { FULL_DATES } from '@/config/dates'
import { yearsFromThen } from '@/lib/dayjs'
import { env } from '@/lib/env'
import { trackServerEvent } from '@/services/mixpanel'

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale()
	const __ = await getTranslations('Seo')

	return {
		title: __('title'),
		description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
		keywords: __.raw('keywords'),
		openGraph: {
			title: __('title'),
			description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
			url: env.NEXT_PUBLIC_APP_URL,
			siteName: 'Ricardo Augusto Kowalski',
			images: [
				{
					url: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image.jpg`,
					width: 1200,
					height: 630,
					alt: __('title'),
				},
			],
			locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: __('title'),
			description: __('description', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
			images: [`${env.NEXT_PUBLIC_APP_URL}/twitter-image.jpg`],
		},
		alternates: {
			canonical: env.NEXT_PUBLIC_APP_URL,
		},
	}
}

export default async function HomePage() {
	const locale = await getLocale()

	trackServerEvent('page_view', {
		page: `home-${locale.split('-')[0]}`,
		url: '/',
	})

	return (
		<div className="layout:flex-row layout:items-start relative flex flex-col items-center">
			<Header />
			<Nav slot="page" />

			<main className="layout:self-stretch max-layout-breakpoint:overflow-hidden flex w-screen max-w-screen grow">
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
			<LazyScreensaver />
			<LazySpecialDates />
			<LazyGameDialog />
		</div>
	)
}
