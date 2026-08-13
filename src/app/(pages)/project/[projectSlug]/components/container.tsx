'use client'

import { useTranslations } from 'next-intl'

import { PageContact } from '@/app/(pages)/components/contact'
import { ProjectDescription } from '@/app/components/project-description'
import { ProjectEntity } from '@/app/components/project-entity'
import { ProjectGroup } from '@/app/components/project-group'
import { ProjectImages } from '@/app/components/project-images'
import { hasProjectLinks, ProjectLinks } from '@/app/components/project-links'
import { Container } from '@/components/ui/container'
import { Skill } from '@/components/ui/skill'
import { useCurrentLocale } from '@/hooks/use-current-locale'
import type { HistoryProject } from '@/types/history'
import { formatList, getProjectAttributions, getProjectSkills } from '@/utils'

interface ProjectContainerProps {
	data: HistoryProject
}

export function ProjectContainer({ data }: Readonly<ProjectContainerProps>) {
	const locale = useCurrentLocale()
	const __ = useTranslations('Project')

	const attributions = getProjectAttributions(data.attributions, locale)
	const skills = getProjectSkills(data)

	const { title, description } = data[locale]

	const hasGallery = data.gallery.length > 0
	const hasLinks = hasProjectLinks(data.links)

	return (
		<div className="w-full overflow-hidden bg-black/2">
			<ProjectImages
				image={data.image}
				gallery={data.gallery}
				title={title}
				classes={{
					singleImage:
						'aspect-6/1 w-full overflow-hidden bg-black [&_img]:scale-125 [&_img]:opacity-85 [&_img]:blur-sm',
				}}
			/>

			<Container sideSpacing="pageContent">
				<div className="text-base sm:text-lg lg:pt-[5vw]">
					<h1 className="font-heading mb-8 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl dark:text-white">
						{title}
					</h1>

					<div>
						<ProjectDescription description={description} variant="page" />
					</div>

					{description && <hr className="my-7 border-black/15 md:my-12 dark:border-white/15" />}

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 xl:gap-y-9">
						<ProjectGroup
							hasGallery
							title={__('team')}
							className="row-span-3 max-md:order-2 sm:col-span-3 md:col-span-2"
						>
							<ul className="flex flex-col gap-3">
								{attributions.map((attribution) => (
									<li key={attribution.name}>
										<ProjectEntity data={attribution} locale={locale} />
									</li>
								))}
							</ul>
						</ProjectGroup>

						<ProjectGroup hasGallery title={__('techStack')} className="sm:col-span-3 md:col-span-2 xl:col-span-3">
							<div className="flex flex-wrap gap-1">
								{skills.map((skill) => (
									<Skill key={skill.title} skill={skill} />
								))}
							</div>
						</ProjectGroup>

						<ProjectGroup hasGallery title={__('startYear')}>
							<p className="text-black/50 dark:text-white/50">{data.year}</p>
						</ProjectGroup>

						<ProjectGroup hasGallery={hasGallery} title={__('categories')}>
							<p className="text-black/50 dark:text-white/50">{formatList({ items: data.categories, locale })}</p>
						</ProjectGroup>

						{hasLinks && (
							<ProjectGroup hasGallery title={__('links')}>
								<ProjectLinks links={data.links} size="sm" slug={data.slug} />
							</ProjectGroup>
						)}
					</div>
				</div>

				<hr className="mt-7 border-black/15 md:mt-12 dark:border-white/15" />

				<PageContact />
			</Container>
		</div>
	)
}
