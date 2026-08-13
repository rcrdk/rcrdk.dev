'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'

import { ProjectDescription } from '@/app/components/project-description'
import { ProjectEntity } from '@/app/components/project-entity'
import { ProjectGroup } from '@/app/components/project-group'
import { ProjectImages } from '@/app/components/project-images'
import { hasProjectLinks, ProjectLinks } from '@/app/components/project-links'
import { Skill } from '@/components/ui/skill'
import type { LocalesType } from '@/i18n/config'
import type { HistoryProject } from '@/types/history'
import { cn, formatList, getProjectAttributions, getProjectSkills } from '@/utils'

interface ContentProps {
	data: HistoryProject
	locale: LocalesType
	hasGallery: boolean
}

export function Content({ data, locale, hasGallery }: Readonly<ContentProps>) {
	const __ = useTranslations('Project')

	const { title, description } = data[locale]
	const attributions = getProjectAttributions(data.attributions, locale)
	const skills = getProjectSkills(data)
	const hasLinks = hasProjectLinks(data.links)

	return (
		<div className="w-full overflow-hidden">
			<ProjectImages
				image={data.image}
				gallery={data.gallery}
				title={title}
				classes={{ singleImage: 'squircle-rounded-dialog overflow-hidden rounded-t-3xl !rounded-b-none' }}
			/>

			<div
				className={cn(
					'text-base',
					hasGallery && 'px-[7vw] pt-0 pb-[22vw] sm:text-lg lg:px-[9vw] lg:py-[5vw]',
					!hasGallery && 'px-8 pt-8 pb-12',
				)}
			>
				<DialogTitle asChild>
					<h5
						className={cn(
							'font-heading mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl dark:text-white',
							!hasGallery && 'text-4xl md:text-4xl',
						)}
					>
						{title}
					</h5>
				</DialogTitle>

				<div>
					<ProjectDescription description={description} variant="dialog" />
				</div>

				{description && (
					<hr
						className={cn(
							'border-black/15 dark:border-white/15',
							hasGallery && 'my-7 md:my-12',
							!hasGallery && 'my-7 md:my-6 xl:my-9',
						)}
					/>
				)}

				<div
					className={cn(
						'gap-6 xl:gap-y-9',
						hasGallery && 'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5',
						!hasGallery && 'flex flex-wrap',
					)}
				>
					<ProjectGroup
						hasGallery={hasGallery}
						title={__('team')}
						className={cn('row-span-3 max-md:order-2 sm:col-span-3 md:col-span-2', !hasGallery && 'order-2')}
					>
						<ul className="flex flex-col gap-3">
							{attributions.map((attribution) => (
								<li key={attribution.name}>
									<ProjectEntity data={attribution} locale={locale} />
								</li>
							))}
						</ul>
					</ProjectGroup>

					<ProjectGroup
						hasGallery={hasGallery}
						title={__('techStack')}
						className="sm:col-span-3 md:col-span-2 xl:col-span-3"
					>
						<div className="flex flex-wrap gap-1">
							{skills.map((skill) => (
								<Skill key={skill.title} skill={skill} />
							))}
						</div>
					</ProjectGroup>

					<ProjectGroup hasGallery={hasGallery} title={__('startYear')} className={cn(!hasGallery && 'w-auto grow')}>
						<p className="text-black/50 dark:text-white/50">{data.year}</p>
					</ProjectGroup>

					<ProjectGroup hasGallery={hasGallery} title={__('categories')} className={cn(!hasGallery && 'w-auto grow')}>
						<p className="text-black/50 dark:text-white/50">{formatList({ items: data.categories, locale })}</p>
					</ProjectGroup>

					{hasLinks && (
						<ProjectGroup hasGallery={hasGallery} title={__('links')} className={cn(!hasGallery && 'w-auto grow')}>
							<ProjectLinks links={data.links} size="xs" />
						</ProjectGroup>
					)}
				</div>
			</div>
		</div>
	)
}
