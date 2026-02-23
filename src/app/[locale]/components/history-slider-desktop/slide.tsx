import { Swiper, SwiperSlide } from 'swiper/react'

import { HistoryCommonInfo } from '@/app/[locale]/components/history-info'
import { ProjectCard } from '@/app/[locale]/components/project-card'
import type { HistoryItem } from '@/types/history'

interface Props {
	data: HistoryItem
}

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

export function HistorySliderDesktopSlide({ data }: Readonly<Props>) {
	const hasProjects = data.projects.length > 0

	return (
		<div className="squircle-rounded flex min-w-full flex-col rounded-3xl border border-black/15 dark:border-white/20">
			<div className="flex flex-col p-6">
				<HistoryCommonInfo data={data} />
			</div>

			{hasProjects && (
				<div data-nested-swiper className="mt-auto w-full">
					<Swiper {...SWIPER_CONFIG} className="w-full !p-6 !pt-0">
						{data.projects.map((project) => (
							<SwiperSlide className="!flex !h-auto !w-1/3 max-xl:!w-2/5" key={project.id}>
								<ProjectCard data={project} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
		</div>
	)
}
