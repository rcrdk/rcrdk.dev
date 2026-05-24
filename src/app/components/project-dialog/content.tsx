'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { IconBrandBehance, IconBrandGithub, IconExternalLink, IconPlayerPlay } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { ProjectEntity } from '@/app/components/project-entity'
import { ProjectGroup } from '@/app/components/project-group'
import { ProjectImages } from '@/app/components/project-images'
import { Button } from '@/components/ui/button'
import { Skill } from '@/components/ui/skill'
import type { LocalesType } from '@/i18n/config'
import type { HistoryProject, HistoryProjectDescription } from '@/types/history'
import { formatList } from '@/utils/format-list'
import { getProjectAttributions } from '@/utils/get-project-attributions'
import { getProjectSkills } from '@/utils/get-project-skills'
import { cn } from '@/utils/tailwind-cn'

const BUTTON_PROPS = {
	as: 'a',
	variant: 'outline',
	size: 'xs',
	icon: true,
	target: '_blank',
	rel: 'noopener noreferrer',
	haptic: true,
} as const

interface ContentProps {
	data: HistoryProject
	locale: LocalesType
	hasGallery: boolean
}

function renderDescription(description: HistoryProjectDescription) {
	if (typeof description === 'string')
		return (
			<p
				className="[&>a]:text-accent-blue text-pretty text-black/75 dark:text-white/75 [&>a]:underline"
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		)

	return description.map((item) => {
		if (item.type === 'title')
			return (
				<h2
					key={item.value}
					className="font-heading mb-6 text-xl font-bold tracking-tight text-balance md:text-2xl lg:text-3xl dark:text-white [&:not(:first-child)]:mt-6"
					dangerouslySetInnerHTML={{ __html: item.value }}
				/>
			)

		return (
			<p
				key={item.value}
				className="[&>a]:text-accent-blue text-pretty text-black/75 dark:text-white/75 [&:not(:first-child)]:mt-2 [&>a]:underline"
				dangerouslySetInnerHTML={{ __html: item.value }}
			/>
		)
	})
}

export function Content({ data, locale, hasGallery }: Readonly<ContentProps>) {
	const __ = useTranslations('Project')

	const { title, description } = data[locale]
	const attributions = getProjectAttributions(data.attributions, locale)
	const skills = getProjectSkills(data)
	const hasLinks = data.links.website || data.links.github || data.links.behance || data.links.video

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

				<div>{renderDescription(description)}</div>

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
						<p className="text-black/50 dark:text-white/50">{formatList(data.categories, locale)}</p>
					</ProjectGroup>

					{hasLinks && (
						<ProjectGroup hasGallery={hasGallery} title={__('links')} className={cn(!hasGallery && 'w-auto grow')}>
							<div className="flex gap-2">
								{data.links.website && (
									<Button {...BUTTON_PROPS} href={data.links.website} title={__('website')}>
										<IconExternalLink aria-hidden />
									</Button>
								)}

								{data.links.github && (
									<Button {...BUTTON_PROPS} href={data.links.github} title={__('github')}>
										<IconBrandGithub aria-hidden />
									</Button>
								)}

								{data.links.behance && (
									<Button {...BUTTON_PROPS} href={data.links.behance} title={__('behance')}>
										<IconBrandBehance aria-hidden />
									</Button>
								)}

								{data.links.video && (
									<Button {...BUTTON_PROPS} href={data.links.video} title={__('video')}>
										<IconPlayerPlay aria-hidden />
									</Button>
								)}
							</div>
						</ProjectGroup>
					)}
				</div>
			</div>
		</div>
	)
}
