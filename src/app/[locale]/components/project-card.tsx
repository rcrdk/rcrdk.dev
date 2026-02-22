import { useState } from 'react'
import { IconArrowRight, IconPhotoOff } from '@tabler/icons-react'
import { useLocale } from 'next-intl'

import { ProjectDrawer } from '@/app/[locale]/components/project-drawer'
import { Image } from '@/components/ui/image'
import type { LocalesType } from '@/i18n/routing'
import type { HistoryProject } from '@/types/history'

interface Props {
	data: HistoryProject
}

export function ProjectCard({ data }: Readonly<Props>) {
	const [open, setOpen] = useState(false)

	function handleOpenChange(open: boolean) {
		setOpen(open)
	}

	const locale = useLocale() as LocalesType
	const { title } = data?.[locale] || {}

	return (
		<>
			<button
				type="button"
				className="group/project-card before:squircle-rounded squircle-rounded max-layout-breakpoint:flex-col relative flex min-h-full w-1/3 min-w-full flex-1 shrink-1 cursor-pointer overflow-hidden rounded-3xl bg-black/2 transition-colors duration-400 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-3xl before:border before:border-black/15 before:transition-colors before:duration-400 hover:bg-black/6 hover:before:border-black/30 dark:bg-white/10 dark:before:border-white/20 dark:hover:bg-white/12 dark:hover:before:border-white/20"
				onClick={() => handleOpenChange(true)}
			>
				<div className="max-layout-breakpoint:w-full relative aspect-101/79 w-1/3 shrink-0">
					{data.image && <Image src={data.image} alt={title} width={200} height={200} />}
					{!data.image && (
						<IconPhotoOff
							className="absolute top-1/2 left-1/2 size-8 -translate-1/2 stroke-[1.5] opacity-25"
							aria-hidden
						/>
					)}

					<div className="max-layout-breakpoint:top-auto max-layout-breakpoint:bottom-0 max-layout-breakpoint:w-full max-layout-breakpoint:h-px absolute top-0 right-0 z-10 h-full w-px bg-black/15 transition-colors duration-400 group-hover/project-card:bg-black/30 dark:bg-white/20 dark:group-hover/project-card:bg-white/20" />
				</div>

				<div className="max-layout-breakpoint:p-4 max-layout-breakpoint:justify-start flex grow flex-col items-start justify-center gap-1.5 px-4 py-2 text-start text-balance">
					<h4 className="line-clamp-2 text-base leading-tight font-semibold">{title}</h4>
					<small className="max-layout-breakpoint:leading-normal text-sm leading-none text-black/50 dark:text-white/50">
						{data.categories.at(0)}
					</small>
				</div>

				<IconArrowRight
					className="max-layout-breakpoint:mx-4 max-layout-breakpoint:self-end max-layout-breakpoint:mb-4 ms-2 me-4 size-6 shrink-0 self-center"
					aria-hidden
				/>
			</button>

			<ProjectDrawer data={data} open={open} onOpenChange={handleOpenChange} />
		</>
	)
}
