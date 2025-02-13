/* eslint-disable @next/next/no-img-element */
'use client'

import 'swiper/css'

import { useCallback, useEffect, useRef, useState } from 'react'
import { IconCirclePlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useDraggable } from 'react-use-draggable-scroll'
import { Swiper, SwiperSlide } from 'swiper/react'

import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'
import { cn } from '@/utils/tailwind-cn'

type Category = 'highlights' | 'websites' | 'web_apps' | 'landing_pages' | 'ecommerces' | 'mobile_apps'

type CategoryDTO = {
	id: Category
	label: string
}

const projects = [
	{
		id: '1',
		name: 'Chilique da Mamãe',
		image: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/4f145c166966545.Y3JvcCw4MDgsNjMyLDAsMA.jpg',
	},
	{
		id: '2',
		name: 'Meu Rosinha: Web App',
		image: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/c7d3ed204162471.Y3JvcCw4MDgsNjMyLDAsMA.png',
	},
	{
		id: '3',
		name: 'Uniasselvi: ENEM',
		image: 'https://mir-s3-cdn-cf.behance.net/projects/808/591c62136910957.Y3JvcCw4MDgsNjMyLDAsMA.jpg',
	},
	{
		id: '4',
		name: 'Adapcon',
		image: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/75f19f114173323.Y3JvcCw4MDgsNjMyLDAsMA.jpg',
	},
]

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

			<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} rootMargin="0px 0px 125px">
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
					>
						{projects.map((item) => (
							<SwiperSlide className="!sm:w-[360px] !w-[280px] !max-w-none" key={item.id}>
								<button className="group focus-visible:before:border-accent-blue focus-visible:ring-accent-blue/40 hover:before:border-content-light relative flex aspect-[11/16] w-full shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl text-start outline-none before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-xl before:border before:border-black/20 before:transition-colors focus-visible:ring-4 lg:aspect-[12/16] dark:bg-white/5 dark:before:border-white/15 dark:hover:before:border-white/50">
									<div className="group-hover:before:border-content-light relative aspect-[4/3] overflow-hidden before:absolute before:inset-x-px before:bottom-0 before:z-[1] before:border-t before:border-black/20 before:transition-colors dark:before:border-white/15 dark:group-hover:before:border-white/50">
										<img
											src={item.image}
											alt=""
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>

									<div className="relative flex grow flex-col p-4">
										<h3 className="mb-2 text-base leading-tight font-bold dark:text-white">{item.name}</h3>
										<p className="line-clamp-2 text-sm text-pretty text-black/60 dark:text-white/50">
											Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, enim! Perferendis aspernatur
											quo.
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

{
	/*
	<p>Usar JSOn Server: https://github.com/kitloong/json-server-vercel/tree/main</p>
	<p>Listar projetos filtrados</p>
	<p>Criar descrição para cada categoria?</p>
	<p>Thumbnail em video/imagem</p>
	<p>Nome</p>
	<p>Descrição</p>
	<p>Tags</p>
	<p>Links: Repo / Behance / Produção</p>
	*/
}
