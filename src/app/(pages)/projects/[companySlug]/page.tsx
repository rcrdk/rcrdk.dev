import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { CompanyProjectsContainer } from '@/app/(pages)/projects/[companySlug]/components/container'
import { ignorePagesRobots } from '@/config/metadata'
import { getCurrentLocale } from '@/i18n/get-current-locale'
import { env } from '@/lib/env'
import { getCompanySlugsWithProjects, getHistoryItemBySlug, getProjectsByCompanySlug } from '@/utils'

interface CompanyProjectsPageProps {
	params: Promise<{ companySlug: string }>
}

export function generateStaticParams() {
	return getCompanySlugsWithProjects().map((companySlug) => ({ companySlug }))
}

export async function generateMetadata({ params }: CompanyProjectsPageProps): Promise<Metadata> {
	const { companySlug } = await params
	const locale = await getCurrentLocale()
	const historyItem = await getHistoryItemBySlug(companySlug, locale)
	const __ = await getTranslations('Seo')

	if (!historyItem) return {}

	const title = `${historyItem.title} | ${__('title')}`
	const description = historyItem.description.at(0)?.replace(/<[^>]*>/g, '')
	const url = `${env.NEXT_PUBLIC_APP_URL}/projects/${companySlug}`

	const openGraphImages = {
		images: [{ url: `${env.NEXT_PUBLIC_APP_URL}${historyItem.companyLogo}`, alt: historyItem.companyLogoAlt }],
	}

	return {
		robots: ignorePagesRobots,
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: 'website',
			...openGraphImages,
		},
		alternates: { canonical: url },
	}
}

export default async function CompanyProjectsPage({ params }: Readonly<CompanyProjectsPageProps>) {
	const { companySlug } = await params
	const locale = await getCurrentLocale()
	const historyItem = await getHistoryItemBySlug(companySlug, locale)

	if (!historyItem) notFound()

	const projects = getProjectsByCompanySlug(companySlug)

	if (projects.length === 0) notFound()

	return <CompanyProjectsContainer companySlug={companySlug} projects={projects} />
}
