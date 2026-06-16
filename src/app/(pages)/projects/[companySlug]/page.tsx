import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import { CompanyProjectsContainer } from '@/app/(pages)/projects/[companySlug]/components/container'
import { ignorePagesRobots } from '@/config/metadata'
import type { LocalesType } from '@/i18n/config'
import { env } from '@/lib/env'
import { getCompanySlugsWithProjects } from '@/utils/get-company-slugs-with-projects'
import { getHistoryItemBySlug } from '@/utils/get-history-item-by-slug'
import { getProjectsByCompanySlug } from '@/utils/get-projects-by-company-slug'

interface Props {
	params: Promise<{ companySlug: string }>
}

export function generateStaticParams() {
	return getCompanySlugsWithProjects().map((companySlug) => ({ companySlug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { companySlug } = await params
	const locale = (await getLocale()) as LocalesType
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

export default async function CompanyProjectsPage({ params }: Props) {
	const { companySlug } = await params
	const locale = (await getLocale()) as LocalesType
	const historyItem = await getHistoryItemBySlug(companySlug, locale)

	if (!historyItem) notFound()

	const projects = getProjectsByCompanySlug(companySlug)

	if (projects.length === 0) notFound()

	return <CompanyProjectsContainer companySlug={companySlug} projects={projects} />
}
