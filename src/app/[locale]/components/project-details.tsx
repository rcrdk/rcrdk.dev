/* eslint-disable @next/next/no-img-element */
'use client'

import { useMemo } from 'react'
import * as DialogRadix from '@radix-ui/react-dialog'
import { IconBrandBehance, IconBrandGithub, IconLink } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { ProjectTranslatedObject } from '@/data/projects'
import { env } from '@/lib/env'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	open: boolean
	onOpenChange: (project?: ProjectTranslatedObject) => void
	project?: ProjectTranslatedObject
}

export function ProjectDetails({ open, onOpenChange, project }: Props) {
	const __ = useTranslations('Projects')
	const locale = useLocale()

	function handleOpenChange() {
		onOpenChange()
	}

	const projectFormatted = useMemo(() => {
		const formatter = new Intl.ListFormat(locale, {
			style: 'long',
			type: 'conjunction',
		})

		const categories = project?.categories?.map((item) => {
			if (item === 'web_app') return __('details.categories.web_app')
			if (item === 'website') return __('details.categories.website')
			if (item === 'landing_page') return __('details.categories.landing_page')
			if (item === 'ecommerce') return __('details.categories.ecommerce')
			if (item === 'mobile_app') return __('details.categories.mobile_app')
			if (item === 'api') return __('details.categories.api')
			return ''
		})

		return {
			categories: formatter.format(categories ?? []),
			roles: formatter.format(project?.roles ?? []),
			stack: formatter.format(project?.stack ?? []),
		}
	}, [__, locale, project])

	return (
		<Dialog open={open} onOpenChange={handleOpenChange} mode="content" hasImageUnderClose={!!project?.image}>
			{project?.image && (
				<div className="xs:!m-0 relative before:absolute before:inset-0 before:border-b before:border-black/10 dark:before:border-white/15">
					<img src={`${env.NEXT_PUBLIC_APP_URL}/projects/${project?.image}`} alt={project?.title} className="w-full" />
				</div>
			)}

			<div className="flex flex-col divide-y divide-black/15 dark:divide-white/20">
				<div
					className={cn(
						'xs:p-8 xs:gap-6 flex flex-col gap-4 p-6 sm:p-8 lg:px-10 lg:py-9',
						!!project?.image ? 'md:flex-row md:gap-8' : 'md:gap-3',
					)}
				>
					<div className="flex grow flex-col gap-1">
						<DialogRadix.Title className="font-heading xs:text-3xl text-2xl leading-none tracking-tight text-balance dark:text-white">
							{project?.title}
						</DialogRadix.Title>

						<p className="text-md xs:text-lg">{projectFormatted.categories}</p>
						<DialogRadix.Description className="sr-only">{project?.intro}</DialogRadix.Description>
					</div>

					<div className="flex gap-2">
						{project?.website && (
							<Button
								as="a"
								href={project?.website}
								target="_blank"
								variant="outline"
								icon
								aria-label={__('details.website')}
							>
								<IconLink />
							</Button>
						)}

						{project?.github && (
							<Button
								as="a"
								href={project?.github}
								target="_blank"
								variant="outline"
								icon
								aria-label={__('details.github')}
							>
								<IconBrandGithub />
							</Button>
						)}

						{project?.behance && (
							<Button
								as="a"
								href={project?.behance}
								target="_blank"
								variant="outline"
								icon
								aria-label={__('details.behance')}
							>
								<IconBrandBehance />
							</Button>
						)}
					</div>
				</div>

				<div className="xs:p-8 flex flex-col gap-4 p-6 sm:p-8 lg:px-10 lg:py-9">
					{project?.description.split(/\r?\n|\r|\n/g).map((item, i) => (
						<p key={i} className="xs:text-md text-base leading-relaxed text-pretty">
							{item.trim()}
						</p>
					))}
				</div>

				<div className="xs:p-8 grid grid-cols-2 gap-4 p-6 sm:p-8 lg:px-10 lg:py-9">
					{project?.categories && (
						<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
							<strong className="text-xs font-bold uppercase">{__('details.category')}:</strong>{' '}
							{projectFormatted.categories}
						</p>
					)}
					{project?.roles && (
						<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
							<strong className="text-xs font-bold uppercase">{__('details.roles')}:</strong> {projectFormatted.roles}
						</p>
					)}
					{project?.employer && (
						<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
							<strong className="text-xs font-bold uppercase">{__('details.employer')}:</strong> {project?.employer}
						</p>
					)}
					{project?.designer && (
						<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
							<strong className="text-xs font-bold uppercase">{__('details.designer')}:</strong> {project?.designer}
						</p>
					)}
					{project?.year && (
						<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
							<strong className="text-xs font-bold uppercase">{__('details.year')}:</strong> {project?.year}
						</p>
					)}
					{project?.stack && (
						<p className="xs:text-base col-span-2 flex flex-col gap-1 text-[15px] text-pretty">
							<strong className="text-xs font-bold uppercase">{__('details.stack')}:</strong> {projectFormatted.stack}
						</p>
					)}
				</div>
			</div>
		</Dialog>
	)
}
