import { Swiper, SwiperSlide } from 'swiper/react'

import { HistoryCommonInfo } from '@/app/(landing)/components/history-info'
import { ProjectCard } from '@/app/(landing)/components/project-card'
import { ViewAllProjectsCard } from '@/app/(landing)/components/view-all-projects-card'
import type { HistoryItem } from '@/types/history'

const SWIPER_CONFIG = {
	nested: true,
	touchMoveStopPropagation: true,
	slidesPerView: 'auto',
	spaceBetween: 16,
	breakpoints: {
		480: {
			spaceBetween: 24,
		},
	},
} as const

const MAX_VISIBLE_PROJECTS = 4

interface Props {
	data: HistoryItem
}

export function HistorySliderDesktopSlide({ data }: Readonly<Props>) {
	const hasProjects = data.projects.length > 0
	const visibleProjects = data.projects.slice(0, MAX_VISIBLE_PROJECTS)
	const hasMoreProjects = data.projects.length > MAX_VISIBLE_PROJECTS

	return (
		<div className="squircle-rounded flex min-w-full flex-col rounded-3xl border border-black/15 dark:border-white/20">
			<div className="layout-xl:p-10 flex flex-col p-6">
				<HistoryCommonInfo data={data} />
			</div>

			{hasProjects && (
				<div data-nested-swiper className="mt-auto w-full">
					<Swiper {...SWIPER_CONFIG} className="layout-xl:!p-10 !layout-xl:!pt-0 w-full !p-6 !pt-0">
						{visibleProjects.map((project) => (
							<SwiperSlide className="!flex !h-auto !w-1/3 max-xl:!w-2/5" key={project.id}>
								<ProjectCard data={project} />
							</SwiperSlide>
						))}

						{hasMoreProjects && (
							<SwiperSlide className="!flex !h-auto !w-1/3 max-xl:!w-2/5" key={`view-all-${data.slug}`}>
								<ViewAllProjectsCard
									href={`/projects/${data.slug}`}
									totalCount={data.projects.length}
									remainingCount={data.projects.length - MAX_VISIBLE_PROJECTS}
								/>
							</SwiperSlide>
						)}
					</Swiper>
				</div>
			)}
		</div>
	)
}
