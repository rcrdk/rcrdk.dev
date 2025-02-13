'use client'

import 'swiper/css'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useDraggable } from 'react-use-draggable-scroll'
import { Swiper, SwiperSlide } from 'swiper/react'

import temporaryProjectImage from '@/assets/thumbnail-tmp.png'
import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'
import { cn } from '@/utils/tailwind-cn'

type Category = 'highlights' | 'websites' | 'web_apps' | 'landing_pages' | 'ecommerces' | 'mobile_apps'

type CategoryDTO = {
	id: Category
	label: string
}

export function Projects() {
	const refContainer = useRef<HTMLDivElement>(null)
	const refScroller = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

	const { events } = useDraggable(refScroller)

	const [category, setCategory] = useState<Category>('highlights')
	const [sideOffset, setSideOffset] = useState(0)

	const __ = useTranslations('Projects')
	const categories = __.raw('categories') as CategoryDTO[]

	const handleChangeCategory = useCallback((id: Category) => {
		setCategory(id)
	}, [])

	const offsetStyle = { '--offset': `${sideOffset}px` } as React.CSSProperties

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
				className="xs:before:-left-12 xs:before:w-12 relative w-full before:absolute before:inset-y-0 before:-left-6 before:z-10 before:w-6 before:bg-gradient-to-r before:from-white before:to-white/0 sm:before:-left-[40px] sm:before:w-[calc(40px)] dark:before:from-black dark:before:to-black/0"
				ref={refContainer}
			>
				<div
					className="xs:-ml-12 scrollbar-hidden -my-2 -ml-6 w-dvw !max-w-none overflow-x-auto overflow-y-hidden py-2 sm:-ml-10 sm:w-[calc(100%+40px+var(--offset))]"
					style={offsetStyle}
					{...events}
					ref={refScroller}
				>
					<div className="xs:before:w-10 xs:after:w-10 flex !max-w-none gap-2 before:w-4 before:shrink-0 after:w-10 after:shrink-0 sm:before:w-[calc(40px-0.5rem)] sm:after:w-[calc(40px-0.5rem)]">
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
										category === item.id &&
											'bg-content-light pointer-events-none border-transparent text-white dark:bg-white dark:text-black',
										category !== item.id &&
											'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 active:scale-85 active:duration-150 dark:border-white/15 dark:hover:border-white dark:hover:text-white',
									)}
									tabIndex={category === item.id ? -1 : 0}
									onClick={() => handleChangeCategory(item.id)}
								>
									{item.label}
								</button>
							</AnimatedContent>
						))}
					</div>
				</div>
			</div>

			<div
				className={cn(
					'scrollbar-hidden xs:w-[calc(100%+96px)] relative w-[calc(100%+48px)] !max-w-none overflow-hidden sm:w-[calc(100%+64px+var(--offset))]',
					'layout:mt-12 xs:-ml-12 mt-8 -ml-6 sm:mt-12 sm:-ml-16',
					'xs:px-12 px-6 sm:px-16 md:px-16 lg:pr-10',
					'sm:before:absolute sm:before:inset-y-0 sm:before:left-0 sm:before:z-10 sm:before:w-16 sm:before:bg-gradient-to-r sm:before:from-white sm:before:to-white/0 dark:sm:before:from-black dark:sm:before:to-black/0',
				)}
				style={offsetStyle}
			>
				<Swiper
					slidesPerView="auto"
					spaceBetween={12}
					className="!overflow-visible select-none"
					breakpoints={{
						480: {
							spaceBetween: 24,
						},
						640: {
							spaceBetween: 32,
						},
					}}
				>
					{Array.from({ length: 5 }).map((_, i) => (
						<SwiperSlide className="!sm:w-[360px] !w-[280px] !max-w-none" key={i}>
							<div className="flex aspect-[13/16] w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl sm:aspect-[13/16]">
								<Image
									src={temporaryProjectImage}
									alt=""
									width={886}
									height={520}
									className="aspect-[16/10] w-full object-cover"
								/>

								<div className="grow border border-t-0 border-black/20 p-4 dark:border-white/15">
									<h3 className="text-md mb-2 font-bold dark:text-white">ProjectInBio</h3>
									<p className="text-sm text-pretty text-black/60 dark:text-white/50">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, enim! Perferendis aspernatur
										quo.
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* <p>Usar JSOn Server: https://github.com/kitloong/json-server-vercel/tree/main</p>
				<p>Listar projetos filtrados</p>
				<p>Criar descrição para cada categoria?</p>
				<p>Thumbnail em video/imagem</p>
				<p>Nome</p>
				<p>Descrição</p>
				<p>Tags</p>
				<p>Links: Repo / Behance / Produção</p> */}
			</div>
		</Section>
	)
}
