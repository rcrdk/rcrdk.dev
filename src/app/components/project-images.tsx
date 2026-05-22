'use client'

import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperOptions } from 'swiper/types'

import { Image } from '@/components/ui/image'
import type { HistoryGalleryItem } from '@/types/history'
import { cn } from '@/utils/tailwind-cn'

interface Props {
	image: string | null
	gallery: HistoryGalleryItem[]
	title: string
	classes?: {
		singleImage?: string
		gallery?: string
	}
}

const FREE_MODE_CONFIG: SwiperOptions['freeMode'] = {
	sticky: false,
	momentum: true,
	momentumBounce: true,
	minimumVelocity: 0.02,
	momentumBounceRatio: 1,
	momentumRatio: 1,
	momentumVelocityRatio: 1,
} as const

const SWIPER_CONFIG: SwiperOptions = {
	modules: [FreeMode],
	centeredSlides: false,
	freeMode: { enabled: true, ...FREE_MODE_CONFIG },
	slidesPerView: 'auto',
	spaceBetween: 16,
	breakpoints: {
		480: {
			spaceBetween: 24,
			centeredSlides: false,
			freeMode: { enabled: true, ...FREE_MODE_CONFIG },
		},
		640: {
			spaceBetween: 32,
			centeredSlides: true,
			freeMode: { enabled: false, ...FREE_MODE_CONFIG },
		},
		960: {
			spaceBetween: 60,
			centeredSlides: true,
			freeMode: { enabled: false, ...FREE_MODE_CONFIG },
		},
	},
} as const

export function ProjectImages({ image, gallery, title, classes }: Readonly<Props>) {
	const hasGallery = gallery.length > 0

	if (!hasGallery && !image) return null

	if (!hasGallery && image) {
		return (
			<div className={cn('relative aspect-101/79 w-full', classes?.singleImage)}>
				<Image src={image} alt={title} fill sizes="66vw" className="size-full object-cover object-top" />
			</div>
		)
	}

	return (
		<div className={cn(classes?.gallery)}>
			<Swiper
				{...SWIPER_CONFIG}
				className="w-full shrink-0 !overflow-visible !px-[5vw] !py-[9vw] lg:!px-[9vw] lg:!pt-[3vw] lg:!pb-0"
			>
				{gallery.map((item) => (
					<SwiperSlide
						key={item.url}
						className={cn('!h-auto', item.format === 'desktop' ? '!w-[150vw] sm:!w-full' : '!w-1/2 sm:!w-1/4')}
					>
						<div
							className={cn(
								'squircle-rounded relative h-full w-full overflow-hidden rounded-2xl shadow-2xl',
								item.format === 'desktop' ? 'aspect-16/9' : 'aspect-9/16',
							)}
						>
							<Image
								src={item.url}
								alt={title}
								sizes="66vw"
								fill
								className="squircle-rounded w-full object-cover object-top"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
