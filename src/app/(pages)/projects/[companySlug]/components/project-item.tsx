'use client'

import { useState } from 'react'
import { IconArrowRight, IconPhotoOff } from '@tabler/icons-react'
import { useLocale } from 'next-intl'

import { ProjectDrawer } from '@/app/components/project-drawer'
import { Image } from '@/components/ui/image'
import { useHaptics } from '@/hooks/use-haptics'
import type { LocalesType } from '@/i18n/config'
import type { HistoryProject } from '@/types/history'

interface Props {
	data: HistoryProject
}

export function ProjectItem({ data }: Readonly<Props>) {
	const [open, setOpen] = useState(false)
	const { triggerHaptic } = useHaptics()
	const locale = useLocale() as LocalesType
	const { title } = data[locale] || {}

	function handleOpenChange(nextOpen: boolean) {
		setOpen(nextOpen)
		if (nextOpen) triggerHaptic()
	}

	return (
		<>
			<button
				type="button"
				onClick={() => handleOpenChange(true)}
				className="group/project-card before:squircle-rounded squircle-rounded relative flex min-h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-black/2 transition-colors duration-400 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-3xl before:border before:border-black/15 before:transition-colors before:duration-400 hover:bg-black/6 hover:before:border-black/30 dark:bg-white/10 dark:before:border-white/20 dark:hover:bg-white/12 dark:hover:before:border-white/20"
			>
				<div className="relative aspect-101/79 w-full shrink-0">
					{data.image && <Image src={data.image} alt={title} width={200} height={200} />}
					{!data.image && (
						<IconPhotoOff
							className="absolute top-1/2 left-1/2 size-8 -translate-1/2 stroke-[1.5] opacity-25"
							aria-hidden
						/>
					)}

					<div className="absolute right-0 bottom-0 z-10 h-px w-full bg-black/15 transition-colors duration-400 group-hover/project-card:bg-black/30 dark:bg-white/20 dark:group-hover/project-card:bg-white/20" />
				</div>

				<div className="flex grow flex-col items-start justify-between gap-1.5 p-4 text-start text-balance">
					<h4 className="line-clamp-2 text-base leading-tight font-semibold">{title}</h4>
					<small className="text-sm leading-normal text-black/50 dark:text-white/50">{data.categories.at(0)}</small>
				</div>

				<IconArrowRight className="absolute right-4 bottom-4 size-5 shrink-0 sm:size-6" aria-hidden />
			</button>

			<ProjectDrawer data={data} open={open} onOpenChange={handleOpenChange} disableTheme />
		</>
	)
}
