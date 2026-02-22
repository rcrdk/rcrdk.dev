import { Swiper, SwiperSlide } from 'swiper/react'

import { HistoryCommonInfo } from '@/app/[locale]/components/history-info'
import { ProjectCard } from '@/app/[locale]/components/project-card'
import type { HistoryItem } from '@/types/history'

interface Props {
	data: HistoryItem
}

const SWIPER_CONFIG = {
	slidesPerView: 'auto',
	spaceBetween: 16,
	breakpoints: {
		480: {
			spaceBetween: 24,
		},
		640: {
			spaceBetween: 32,
		},
	},
} as const

export function HistoryListMobileItem({ data }: Readonly<Props>) {
	const hasProjects = data.projects.length > 0

	return (
		<div className="mt-8 flex flex-col gap-8 border-t border-black/15 pt-8 sm:mt-12 sm:pt-12 dark:border-white/20">
			<div className="flex flex-col gap-6">
				<HistoryCommonInfo data={data} />
			</div>

			{hasProjects && (
				<Swiper {...SWIPER_CONFIG} className="mt-auto w-full !overflow-visible">
					{data.projects.map((project) => (
						<SwiperSlide className="!h-auto !w-60" key={project.id}>
							<ProjectCard data={project} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	)
}
