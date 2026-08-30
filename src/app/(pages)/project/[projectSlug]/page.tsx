import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { ProjectContainer } from '@/app/(pages)/project/[projectSlug]/components/container'
import { ignorePagesRobots } from '@/config/metadata'
import { getCurrentLocale } from '@/i18n/get-current-locale'
import { env } from '@/lib/env'
import { getAllProjectSlugs, getProjectBySlug } from '@/utils'

const PROJECT_SEO_SLUGS = new Set(['hero-mobile', 'hero-desktop'])

interface ProjectPageProps {
	params: Promise<{ projectSlug: string }>
}

export function generateStaticParams() {
	return getAllProjectSlugs().map((projectSlug) => ({ projectSlug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { projectSlug } = await params
	const project = getProjectBySlug(projectSlug)

	if (!project) return {}

	const locale = await getCurrentLocale()
	const __ = await getTranslations('Seo')

	const { title: projectTitle } = project[locale]

	const title = `${projectTitle} | ${__('title')}`
	const description = PROJECT_SEO_SLUGS.has(projectSlug) ? __(`projects.${projectSlug}`) : undefined
	const url = `${env.NEXT_PUBLIC_APP_URL}/project/${projectSlug}`

	const imageSelected = project.image ?? project.gallery.at(0)?.url

	const openGraphImages = imageSelected
		? { images: [{ url: `${env.NEXT_PUBLIC_APP_URL}${imageSelected}`, alt: title }] }
		: {}
	const twitterImages = imageSelected ? { images: [`${env.NEXT_PUBLIC_APP_URL}${imageSelected}`] } : {}

	return {
		robots: ignorePagesRobots,
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: 'article',
			...openGraphImages,
		},
		twitter: {
			card: imageSelected ? 'summary_large_image' : 'summary',
			title,
			description,
			...twitterImages,
		},
		alternates: { canonical: url },
	}
}

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
	const { projectSlug } = await params
	const project = getProjectBySlug(projectSlug)

	if (!project) notFound()

	return <ProjectContainer data={project} />
}
