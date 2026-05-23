import { Swiper, SwiperSlide } from 'swiper/react'

import { HistoryCommonInfo } from '@/app/(landing)/components/history-info'
import { ProjectCard } from '@/app/(landing)/components/project-card'
import { ViewAllProjectsCard } from '@/app/(landing)/components/view-all-projects-card'
import type { HistoryItem } from '@/types/history'

const SWIPER_CONFIG = {
	slidesPerView: 'auto',
	spaceBetween: 12,
	breakpoints: {
		480: {
			spaceBetween: 24,
		},
		640: {
			spaceBetween: 32,
		},
	},
} as const

const MAX_VISIBLE_PROJECTS = 4

interface Props {
	data: HistoryItem
}

export function HistoryListMobileItem({ data }: Readonly<Props>) {
	const hasProjects = data.projects.length > 0
	const visibleProjects = data.projects.slice(0, MAX_VISIBLE_PROJECTS)
	const hasMoreProjects = data.projects.length > MAX_VISIBLE_PROJECTS

	return (
		<div className="mt-8 flex flex-col gap-8 border-t border-black/15 pt-8 sm:mt-12 sm:pt-12 dark:border-white/20">
			<div className="flex flex-col">
				<HistoryCommonInfo data={data} />
			</div>

			{hasProjects && (
				<Swiper {...SWIPER_CONFIG} className="mt-auto w-full !overflow-visible">
					{visibleProjects.map((project) => (
						<SwiperSlide className="!h-auto !w-45 sm:!w-60" key={project.id}>
							<ProjectCard data={project} />
						</SwiperSlide>
					))}

					{hasMoreProjects && (
						<SwiperSlide className="!h-auto !w-45 sm:!w-60" key={`view-all-${data.slug}`}>
							<ViewAllProjectsCard
								href={`/projects/${data.slug}`}
								totalCount={data.projects.length}
								remainingCount={data.projects.length - MAX_VISIBLE_PROJECTS}
							/>
						</SwiperSlide>
					)}
				</Swiper>
			)}
		</div>
	)
}
