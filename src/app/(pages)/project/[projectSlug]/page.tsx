import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import { ProjectContainer } from '@/app/(pages)/project/[projectSlug]/components/container'
import { ignorePagesRobots } from '@/config/metadata'
import type { LocalesType } from '@/i18n/config'
import { env } from '@/lib/env'
import { trackServerEvent } from '@/services/mixpanel'
import { getAllProjectSlugs } from '@/utils/get-all-project-slugs'
import { getProjectBySlug } from '@/utils/get-project-by-slug'

interface Props {
	params: Promise<{ projectSlug: string }>
}

export function generateStaticParams() {
	return getAllProjectSlugs().map((projectSlug) => ({ projectSlug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { projectSlug } = await params
	const project = getProjectBySlug(projectSlug)

	if (!project) return {}

	const locale = (await getLocale()) as LocalesType
	const __ = await getTranslations('Seo')

	const { title: projectTitle } = project[locale]

	const title = `${projectTitle} | ${__('title')}`
	const url = `${env.NEXT_PUBLIC_APP_URL}/project/${projectSlug}`

	const imageSelected = project.image ?? project.gallery.at(0)?.url

	const openGraphImages = imageSelected
		? { images: [{ url: `${env.NEXT_PUBLIC_APP_URL}${imageSelected}`, alt: title }] }
		: {}
	const twitterImages = imageSelected ? { images: [`${env.NEXT_PUBLIC_APP_URL}${imageSelected}`] } : {}

	return {
		robots: ignorePagesRobots,
		title,
		openGraph: {
			title,
			url,
			type: 'article',
			...openGraphImages,
		},
		twitter: {
			card: imageSelected ? 'summary_large_image' : 'summary',
			title,
			...twitterImages,
		},
		alternates: { canonical: url },
	}
}

export default async function ProjectPage({ params }: Props) {
	const { projectSlug } = await params
	const project = getProjectBySlug(projectSlug)

	if (!project) notFound()

	trackServerEvent('page_view', {
		page: `project-${projectSlug}`,
		url: `/project/${projectSlug}`,
	})

	return <ProjectContainer data={project} />
}
