import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Content } from '@/app/[locale]/components/content'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { routing } from '@/i18n/routing'
import { trackServerEvent } from '@/lib/mixpanel'

export async function generateMetadata(): Promise<Metadata> {
	const __ = await getTranslations('Home')

	return {
		title: __('seo.title'),
		description: __('seo.description'),
		keywords: __.raw('seo.keywords'),
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
	params: Promise<{ locale: (typeof routing.locales)[number] }>
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
		<div className="layout:flex-row layout:items-start flex flex-col items-center">
			<Header />

			<main className="layout:self-stretch flex grow">
				<Container size="center" sideSpacing="lg">
					<Content />
				</Container>
			</main>
		</div>
	)
}
