import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { About } from '@/app/[locale]/components/about'
import { Contact } from '@/app/[locale]/components/contact'
import { Hero } from '@/app/[locale]/components/hero'
import { Journey } from '@/app/[locale]/components/journey'
import { Projects } from '@/app/[locale]/components/projects'
import { Skills } from '@/app/[locale]/components/skills'
import { Header } from '@/components/common/header'
import { Nav } from '@/components/common/nav'
import { ScrollStart } from '@/components/common/scroll-start'
import { Anchor } from '@/components/ui/anchor'
import { Container } from '@/components/ui/container'
import { LocalesType, routing } from '@/i18n/routing'
import { trackServerEvent } from '@/lib/mixpanel'

export async function generateMetadata(): Promise<Metadata> {
	const __ = await getTranslations('Seo')

	return {
		title: __('title'),
		description: __('description'),
		keywords: __.raw('keywords'),
		alternates: {
			canonical: '/pt-br',
			languages: {
				pt: '/pt-br',
				en: '/en',
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

	if (isValidLocaleSlug) {
		trackServerEvent('page_view', {
			page: `home-${locale.split('-')[0]}`,
			url: `/${locale}`,
		})
	}

	return (
		<div className="layout:flex-row layout:items-start relative flex flex-col items-center">
			<Header />
			<Nav slot="page" />

			<main className="layout:self-stretch flex max-w-full grow">
				<Container
					size="center"
					sideSpacing="lg"
					className="xs:pb-18 layout:pb-0 my-auto pb-14 sm:pb-20"
					classNameCenter="divide-black/10 dark:divide-white/15 divide-y sm:divide-y-0"
				>
					<Anchor id="home" />
					<Hero />

					<Anchor id="about" />
					<About />

					<Anchor id="skills" />
					<Skills />

					<Anchor id="projects" />
					<Projects />

					<Anchor id="journey" />
					<Journey />

					<Anchor id="contact" />
					<Contact />
				</Container>
			</main>

			<ScrollStart />
		</div>
	)
}
