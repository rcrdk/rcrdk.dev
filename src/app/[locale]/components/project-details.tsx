/* eslint-disable @next/next/no-img-element */
'use client'

import { useCallback, useEffect, useMemo } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { IconBrandBehance, IconBrandGithub, IconLink, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useProject } from '@/hooks/use-project'
import { env } from '@/lib/env'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	projectId?: number
	open: boolean
	onOpenChange: (id?: number) => void
}

export function ProjectDetails({ open, onOpenChange, projectId }: Props) {
	const __ = useTranslations('Projects')

	const { data, error } = useProject({
		enabled: open && !!projectId,
		projectId: projectId!,
	})

	function handleOpenChange() {
		onOpenChange()
	}

	useEffect(() => {
		if (!!error) {
			onOpenChange()
		}
	}, [error, onOpenChange])

	const getProjectCategories = useCallback(
		(entries?: string[]) => {
			const labels: string[] = []

			entries?.map((item) => {
				if (item === 'web_app') {
					labels.push(__('details.categories.web_app'))
				}
				if (item === 'website') {
					labels.push(__('details.categories.website'))
				}
				if (item === 'landing_page') {
					labels.push(__('details.categories.landing_page'))
				}
				if (item === 'ecommerce') {
					labels.push(__('details.categories.ecommerce'))
				}
				if (item === 'mobile_app') {
					labels.push(__('details.categories.mobile_app'))
				}
				if (item === 'api') {
					labels.push(__('details.categories.api'))
				}
			})

			return entries ? labels : null
		},
		[__],
	)

	const project = useMemo(() => {
		return {
			title: data?.project.title ?? '',
			intro: data?.project.intro ?? '',
			image: data?.project.image,
			description: data?.project?.description.split(/\r?\n|\r|\n/g).map((item) => item.trim()) ?? [],
			links: {
				behance: data?.project.behance,
				github: data?.project.github,
				website: data?.project.website,
			},
			roles: data?.project.roles.join(', '),
			stack: data?.project.stack.join(', '),
			designer: data?.project.designer,
			year: data?.project.year,
			employer: data?.project.employer,
			categories: getProjectCategories(data?.project.categories)?.join(', '),
		}
	}, [data, getProjectCategories])

	return (
		<Dialog.Root open={open && !!data?.project} onOpenChange={handleOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[99] overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50">
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-20 sm:items-center sm:p-12 lg:p-20">
						<Dialog.Content
							className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all shadow-dialog relative max-w-[440px] overflow-hidden rounded-3xl border border-black/15 bg-white will-change-transform outline-none md:max-w-[540px] dark:border-white/20 dark:bg-black"
							onOpenAutoFocus={(e) => e.preventDefault()}
						>
							{project.image && (
								<div className="xs:!m-0 relative before:absolute before:inset-0 before:border-b before:border-black/10 dark:before:border-white/15">
									<img
										src={`${env.NEXT_PUBLIC_APP_URL}/projects/${project.image}`}
										alt={project.title}
										className="w-full"
									/>
								</div>
							)}

							<div className="flex flex-col divide-y divide-black/15 dark:divide-white/20">
								<div
									className={cn(
										'xs:p-8 xs:gap-6 flex flex-col gap-4 p-6 sm:p-8 lg:px-10 lg:py-9',
										!!project.image ? 'md:flex-row md:gap-8' : 'md:gap-3',
									)}
								>
									<div className="flex grow flex-col gap-1">
										<Dialog.Title className="font-heading xs:text-3xl text-2xl leading-none tracking-tight text-balance dark:text-white">
											{project.title}
										</Dialog.Title>

										{project.categories && <p className="text-md xs:text-lg">{project.categories}</p>}
										<Dialog.Description className="sr-only">{project.intro}</Dialog.Description>
									</div>

									<div className="flex gap-2">
										{project.links.website && (
											<Button
												as="a"
												href={project.links.website}
												target="_blank"
												variant="outline"
												icon
												aria-label={__('details.website')}
											>
												<IconLink />
											</Button>
										)}

										{project.links.github && (
											<Button
												as="a"
												href={project.links.github}
												target="_blank"
												variant="outline"
												icon
												aria-label={__('details.github')}
											>
												<IconBrandGithub />
											</Button>
										)}

										{project.links.behance && (
											<Button
												as="a"
												href={project.links.behance}
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
									{project?.description.map((item, i) => (
										<p key={i} className="xs:text-md text-base leading-relaxed text-pretty">
											{item}
										</p>
									))}
								</div>

								<div className="xs:p-8 grid grid-cols-2 gap-4 p-6 sm:p-8 lg:px-10 lg:py-9">
									{project.categories && (
										<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
											<strong className="text-xs font-bold uppercase">{__('details.category')}:</strong>{' '}
											{project.categories}
										</p>
									)}
									{project.roles && (
										<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
											<strong className="text-xs font-bold uppercase">{__('details.roles')}:</strong> {project.roles}
										</p>
									)}
									{project.employer && (
										<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
											<strong className="text-xs font-bold uppercase">{__('details.employer')}:</strong>{' '}
											{project.employer}
										</p>
									)}
									{project.designer && (
										<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
											<strong className="text-xs font-bold uppercase">{__('details.designer')}:</strong>{' '}
											{project.designer}
										</p>
									)}
									{project.year && (
										<p className="xs:text-base flex flex-col gap-1 text-[15px] text-pretty">
											<strong className="text-xs font-bold uppercase">{__('details.year')}:</strong> {project.year}
										</p>
									)}
									{project.stack && (
										<p className="xs:text-base col-span-2 flex flex-col gap-1 text-[15px] text-pretty">
											<strong className="text-xs font-bold uppercase">{__('details.stack')}:</strong> {project.stack}
										</p>
									)}
								</div>
							</div>

							<Dialog.Close
								className={cn(
									'focus-visible:ring-accent-blue/50 focus-visible:border-accent-blue focus-visible:bg-accent-blue xs:top-6 xs:right-6 absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white shadow-2xl backdrop-blur-xs transition-all outline-none hover:bg-black focus-visible:ring-4',
									!project.image &&
										'bg-black/10 text-black/35 hover:text-white dark:bg-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black',
								)}
							>
								<IconX className="size-5" />
							</Dialog.Close>
						</Dialog.Content>
					</div>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
