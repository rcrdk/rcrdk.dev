/* eslint-disable jsx-a11y/alt-text */
'use client'

import 'swiper/css'

import { useCallback, useEffect, useRef, useState } from 'react'
import { IconCirclePlus, IconPhoto } from '@tabler/icons-react'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useDraggable } from 'react-use-draggable-scroll'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Image } from '@/components/ui/image'
import { Section } from '@/components/ui/section'
import { getProjects } from '@/http/get-projects'
import { ProjectFilters } from '@/http/types/project'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/utils/tailwind-cn'

type CategoryDTO = {
	id: ProjectFilters
	label: string
}

export function ProjectsComponent() {
	const refContainer = useRef<HTMLDivElement>(null)
	const refScroller = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
	const swiperRef = useRef<SwiperRef>(null)

	const { events } = useDraggable(refScroller)

	const [filter, setFilter] = useState<ProjectFilters>('highlights')
	const [sideOffset, setSideOffset] = useState(0)

	const __ = useTranslations('Projects')
	const categories = __.raw('categories') as CategoryDTO[]

	const handleChangeFilter = useCallback((id: ProjectFilters) => {
		setFilter(id)
	}, [])

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['projects', filter],
		queryFn: async () => await getProjects({ filter }),
	})

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
			}, 150)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			clearTimeout(timeout)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (!swiperRef.current) return

		swiperRef.current.swiper.slideTo(0)

		if (isFetching || isLoading) {
			swiperRef.current.swiper.allowTouchMove = false
		} else {
			swiperRef.current.swiper.allowTouchMove = true
		}
	}, [isFetching, isLoading])

	const offsetStyle = { '--offset': `${sideOffset}px` } as React.CSSProperties

	return (
		<Section>
			<h2 className="layout:mb-8 mb-8 sm:mb-12">
				<SplitText
					text={__('title')}
					delay={50}
					className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white"
				/>
			</h2>

			<div
				className="xs:before:-left-12 xs:before:w-12 relative w-full before:absolute before:inset-y-0 before:-left-6 before:z-10 before:w-6 before:bg-gradient-to-r before:from-white before:to-white/0 max-[929px]:before:hidden sm:before:-left-[40px] sm:before:w-[calc(40px)] dark:before:from-black dark:before:to-black/0"
				ref={refContainer}
			>
				<div
					className="scrollbar-hidden m xs:-ml-12 -my-2 -ml-6 w-dvw !max-w-none overflow-x-auto overflow-y-hidden py-2 max-[929px]:w-screen min-[929px]:!-ml-10 min-[929px]:w-[calc(100%+40px+var(--offset))] sm:-ml-16 md:-ml-20"
					style={offsetStyle}
					{...events}
					ref={refScroller}
				>
					<div
						className={cn(
							'xs:before:w-10 xs:after:w-10 flex !max-w-none gap-2 before:w-4 before:shrink-0 after:w-4 after:shrink-0 min-[929px]:before:!w-[calc(40px-0.5rem)] min-[929px]:after:!w-[calc(40px-0.5rem)] sm:before:w-[calc(64px-0.5rem)] sm:after:w-[calc(64px-0.5rem)] md:before:w-[calc(80px-0.5rem)] md:after:w-[calc(80px-0.5rem)]',
							(isFetching || isLoading) && '[&>div]:cursor-wait',
						)}
					>
						{categories.map((item, index) => (
							<AnimatedContent
								direction="horizontal"
								delay={index * 75}
								distance={100}
								threshold={0}
								reverse
								config={{ tension: 60, friction: 15 }}
								rootMargin="0px 100px 0px 100px"
								key={item.id}
							>
								<button
									className={cn(
										'rounded-2xl border px-4 py-2 text-xs leading-none font-bold tracking-tight whitespace-nowrap uppercase transition-all select-none',
										filter === item.id &&
											'bg-content-light pointer-events-none border-transparent text-white dark:bg-white dark:text-black',
										filter !== item.id &&
											'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 active:scale-85 active:duration-150 dark:border-white/15 dark:hover:border-white dark:hover:text-white',
										(isFetching || isLoading) && 'pointer-events-none opacity-60',
									)}
									tabIndex={filter === item.id ? -1 : 0}
									onClick={() => handleChangeFilter(item.id)}
									disabled={isFetching || isLoading}
								>
									{item.label}
								</button>
							</AnimatedContent>
						))}
					</div>
				</div>
			</div>

			<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} rootMargin="0px 0px 125px">
				<div
					className={cn(
						'scrollbar-hidden relative !max-w-none overflow-hidden max-[929px]:!w-screen min-[929px]:w-[calc(100%+64px+var(--offset))]',
						'layout:mt-12 xs:-ml-12 mt-8 -ml-6 min-[929px]:!-ml-16 sm:mt-12 sm:-ml-16 md:-ml-20',
						'xs:px-12 px-6 min-[929px]:!px-16 sm:px-16 md:px-20 lg:pr-10',
						'max-[929px]:before:hidden sm:before:absolute sm:before:inset-y-0 sm:before:left-0 sm:before:z-10 sm:before:w-16 sm:before:bg-gradient-to-r sm:before:from-white sm:before:to-white/0 dark:sm:before:from-black dark:sm:before:to-black/0',
					)}
					style={offsetStyle}
				>
					<Swiper
						slidesPerView="auto"
						spaceBetween={16}
						className="!overflow-visible !py-[4px] select-none"
						breakpoints={{
							480: {
								spaceBetween: 24,
							},
							640: {
								spaceBetween: 32,
							},
						}}
						ref={swiperRef}
					>
						{(isFetching || isLoading) &&
							Array.from({ length: 10 }).map((_, i) => (
								<SwiperSlide className="!sm:w-[360px] !w-[280px] !max-w-none" key={i}>
									<div className="aspect-[11/16] w-full shrink-0 animate-pulse overflow-hidden rounded-xl bg-black/5 [animation-duration:1s] lg:aspect-[11/16] dark:bg-white/15" />
								</SwiperSlide>
							))}

						{data?.projects &&
							data.projects.map((item) => (
								<SwiperSlide className="!sm:w-[360px] !w-[280px] !max-w-none" key={item.id}>
									<button className="group focus-visible:before:border-accent-blue focus-visible:ring-accent-blue/40 hover:before:border-content-light relative flex aspect-[11/16] w-full shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl text-start outline-none before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-xl before:border before:border-black/20 before:transition-colors focus-visible:ring-4 lg:aspect-[11/16] dark:bg-white/5 dark:before:border-white/15 dark:hover:before:border-white/50">
										<div className="group-hover:before:border-content-light relative flex aspect-[4/3] w-full overflow-hidden before:absolute before:inset-x-px before:bottom-0 before:z-[1] before:border-t before:border-black/20 before:transition-colors dark:before:border-white/15 dark:group-hover:before:border-white/50">
											{item.image ? (
												<Image src={item.image} />
											) : (
												<IconPhoto className="m-auto size-20 stroke-1 opacity-20" />
											)}
										</div>

										<div className="relative flex grow flex-col p-4">
											<h3 className="mb-2 text-base leading-tight font-bold text-balance dark:text-white">
												{item.title}
											</h3>

											<p className="line-clamp-4 text-sm text-pretty text-black/60 dark:text-white/50">
												{item.intro['pt-br']}
											</p>

											<span className="mt-auto flex items-center gap-1">
												<IconCirclePlus className="size-5" />
												<span className="text-sm font-bold">Detalhes</span>
											</span>
										</div>
									</button>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</AnimatedContent>
		</Section>
	)
}

export function Projects() {
	return (
		<QueryClientProvider client={queryClient}>
			<ProjectsComponent />
		</QueryClientProvider>
	)
}
