'use client'

import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { trackEvent } from '@/lib/track-event'
import { cn } from '@/utils/tailwind-cn'

interface Props {
	href: string
	companySlug: string
	totalCount: number
	remainingCount: number
}

export function ViewAllProjectsCard({ href, companySlug, totalCount, remainingCount }: Readonly<Props>) {
	const __ = useTranslations('Share')

	function handleClick() {
		trackEvent(ANALYTICS_EVENTS.viewAllProjects, { company: companySlug })
	}

	return (
		<Link
			href={href}
			onClick={handleClick}
			className={cn(
				'group/view-all-projects before:squircle-rounded squircle-rounded max-layout-breakpoint:flex-col relative flex min-h-full w-1/3 min-w-full flex-1 shrink-1 cursor-pointer overflow-hidden rounded-3xl bg-black/2 transition-colors duration-400 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-3xl before:border before:border-black/15 before:transition-colors before:duration-400 hover:bg-black/6 hover:before:border-black/30 dark:bg-white/10 dark:before:border-white/20 dark:hover:bg-white/12 dark:hover:before:border-white/20',
				'w-full',
			)}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="max-layout-breakpoint:w-full relative flex aspect-101/79 w-1/3 shrink-0 items-center justify-center">
				<span className="font-heading text-3xl leading-none font-bold text-black/20 dark:text-white/20">
					+{remainingCount}
				</span>
				<div className="max-layout-breakpoint:top-auto max-layout-breakpoint:bottom-0 max-layout-breakpoint:w-full max-layout-breakpoint:h-px absolute top-0 right-0 z-10 h-full w-px bg-black/15 transition-colors duration-400 group-hover/view-all-projects:bg-black/30 dark:bg-white/20 dark:group-hover/view-all-projects:bg-white/20" />
			</div>

			<div className="max-layout-breakpoint:p-4 max-layout-breakpoint:!justify-between flex grow flex-col items-start justify-center gap-1.5 px-4 py-2 text-start text-balance">
				<h4 className="line-clamp-2 text-base leading-tight font-semibold">{__('viewAllProjects')}</h4>
				<small className="max-layout-breakpoint:leading-normal text-sm leading-none text-black/50 dark:text-white/50">
					{__('projectsCount', { count: totalCount })}
				</small>
			</div>

			<IconArrowRight
				className="max-layout-breakpoint:m-0 max-layout-breakpoint:absolute max-layout-breakpoint:bottom-4 max-layout-breakpoint:right-4 ms-2 me-4 size-5 shrink-0 self-center sm:size-6"
				aria-hidden
			/>
		</Link>
	)
}
