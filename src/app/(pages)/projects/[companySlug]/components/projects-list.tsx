'use client'

import { useTranslations } from 'next-intl'

import { ProjectItem } from '@/app/(pages)/projects/[companySlug]/components/project-item'
import type { HistoryProject } from '@/types/history'

interface Props {
	projects: HistoryProject[]
}

export function CompanyProjectsList({ projects }: Readonly<Props>) {
	const __ = useTranslations('Project')

	return (
		<div className="border-y border-black/15 pt-7 pb-[8vw] md:pt-12 lg:border-t-0 lg:pt-0 lg:pb-[4.5vw] dark:border-white/15">
			<h2 className="font-heading mb-7 text-3xl font-bold tracking-tight text-balance md:mb-12 lg:text-4xl">
				{__('title')}
			</h2>

			<ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-8 md:gap-y-12 xl:grid-cols-4">
				{projects.map((project) => (
					<li key={project.id}>
						<ProjectItem data={project} />
					</li>
				))}
			</ul>
		</div>
	)
}
