'use client'

import { IconBrandBehance, IconBrandGithub, IconExternalLink } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { PageContact } from '@/app/(pages)/components/contact'
import { ProjectEntity } from '@/app/components/project-entity'
import { ProjectGroup } from '@/app/components/project-group'
import { ProjectImages } from '@/app/components/project-images'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Skill } from '@/components/ui/skill'
import type { LocalesType } from '@/i18n/config'
import type { HistoryProject } from '@/types/history'
import { formatList } from '@/utils/format-list'
import { getProjectAttributions } from '@/utils/get-project-attributions'
import { getProjectSkills } from '@/utils/get-project-skills'

interface Props {
	data: HistoryProject
}

const BUTTON_PROPS = {
	as: 'a',
	variant: 'outline',
	size: 'sm',
	icon: true,
	target: '_blank',
	rel: 'noopener noreferrer',
	haptic: true,
} as const

export function ProjectContainer({ data }: Readonly<Props>) {
	const locale = useLocale() as LocalesType
	const __ = useTranslations('Project')

	const attributions = getProjectAttributions(data.attributions, locale)
	const skills = getProjectSkills(data)

	const title = data[locale].title
	const description = data[locale].description

	const hasGallery = data.gallery.length > 0
	const hasLinks = data.links.website || data.links.github || data.links.behance

	return (
		<div className="w-full overflow-hidden bg-black/2">
			<ProjectImages
				image={data.image}
				gallery={data.gallery}
				title={data[locale].title}
				classes={{
					singleImage:
						'aspect-6/1 w-full overflow-hidden bg-black [&_img]:scale-125 [&_img]:opacity-85 [&_img]:blur-sm',
				}}
			/>

			<Container sideSpacing="pageContent">
				<div className="text-base sm:text-lg lg:pt-[5vw]">
					<h1 className="font-heading mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl dark:text-white">
						{title}
					</h1>

					<p className="text-pretty text-black/75 dark:text-white/75">{description}</p>

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
							<p className="text-black/50 dark:text-white/50">{formatList(data.categories, locale)}</p>
						</ProjectGroup>

						{hasLinks && (
							<ProjectGroup hasGallery title={__('links')}>
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
								</div>
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
