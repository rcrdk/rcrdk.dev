import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'

import { HistorySliderDesktopSlide } from '@/app/[locale]/components/history-slider-desktop/slide'
import { HistoryCommonIntro } from '@/app/[locale]/components/intro'
import { AnimatedContent } from '@/components/animated/animated-content'
import type { HistoryItem } from '@/types/history'
import { cn } from '@/utils/tailwind-cn'

const RESIZE_DELAY = 150

const NESTED_SWIPER_SELECTOR = '[data-nested-swiper]'

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

function handleParentTouchStart(swiper: SwiperInstance, event: TouchEvent | MouseEvent | PointerEvent) {
	const target = event?.target as Element | null
	if (target?.closest?.(NESTED_SWIPER_SELECTOR)) swiper.allowTouchMove = false
}

function handleParentTouchEnd(swiper: SwiperInstance) {
	swiper.allowTouchMove = true
}

interface Props {
	title: string
	buttonNextSlideText: string
	text: string
	list: HistoryItem[]
}

export function HistorySliderDesktop({ title, buttonNextSlideText, text, list }: Readonly<Props>) {
	const refContainer = useRef<HTMLDivElement>(null)
	const swiperRef = useRef<SwiperRef>(null)

	const [sideOffset, setSideOffset] = useState(0)

	function handleSlideNext() {
		swiperRef.current?.swiper.slideNext()
	}

	useEffect(() => {
		if (!refContainer.current || typeof window === 'undefined') return

		const rightOffset = document.documentElement.offsetWidth - refContainer.current.getBoundingClientRect().right
		setSideOffset(rightOffset)
		let timeout: NodeJS.Timeout

		const handleResize = () => {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				if (!refContainer.current || document.documentElement.offsetWidth < 640) return
				const rightOffset = document.documentElement.offsetWidth - refContainer.current.getBoundingClientRect().right
				setSideOffset(rightOffset)
			}, RESIZE_DELAY)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			clearTimeout(timeout)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<>
			<div
				className="xs:before:-left-12 xs:before:w-12 relative w-full before:absolute before:inset-y-0 before:-left-6 before:z-10 before:w-6 before:bg-gradient-to-r before:from-white before:to-white/0 max-[929px]:before:hidden sm:before:-left-10 sm:before:w-10 dark:before:from-black dark:before:to-black/0"
				ref={refContainer}
			/>

			<AnimatedContent>
				<div
					className={cn(
						'scrollbar-hidden relative !max-w-none overflow-hidden max-[929px]:!w-screen min-[929px]:w-[calc(100%+64px+var(--offset))]',
						'xs:-ml-12 -ml-6 min-[929px]:!-ml-16 sm:-ml-16 md:-ml-20',
						'xs:px-12 px-6 min-[929px]:!px-16 sm:px-16 md:px-20 lg:pr-10',
						'max-[929px]:before:hidden sm:before:absolute sm:before:inset-y-0 sm:before:left-0 sm:before:z-10 sm:before:w-16 sm:before:bg-gradient-to-r sm:before:from-white sm:before:to-white/0 dark:sm:before:from-black dark:sm:before:to-black/0',
					)}
					style={{ '--offset': `${sideOffset}px` }}
				>
					<Swiper
						{...SWIPER_CONFIG}
						className="!overflow-visible select-none"
						ref={swiperRef}
						onTouchStart={handleParentTouchStart}
						onTouchEnd={handleParentTouchEnd}
					>
						<SwiperSlide className="!flex !h-auto !w-9/20 flex-col items-start justify-center pe-8 [&.swiper-slide-active>.inactive-border]:opacity-0">
							<HistoryCommonIntro
								heading={title}
								text={text}
								buttonText={buttonNextSlideText}
								handleSlideNext={handleSlideNext}
							/>

							<div className="inactive-border squircle-rounded pointer-events-none absolute inset-y-0 right-0 -z-1 w-1/4 rounded-3xl border-y border-e border-black/15 transition-opacity duration-400 before:absolute before:-inset-px before:z-10 before:w-full before:bg-gradient-to-r before:from-white before:to-white/0 dark:border-white/20 dark:before:from-black dark:before:to-black/0" />
						</SwiperSlide>

						{list.map((item) => {
							const hasProjects = item.projects.length > 0

							return (
								<SwiperSlide className={cn('!flex !h-auto !w-full', !hasProjects && '!w-1/2')} key={item.id}>
									<HistorySliderDesktopSlide data={item} />
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
			</AnimatedContent>
		</>
	)
}
