'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDraggable } from 'react-use-draggable-scroll'

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
				className="xs:before:-left-12 xs:before:w-12 relative w-full before:absolute before:inset-y-0 before:-left-6 before:w-6 before:bg-gradient-to-r before:from-white before:to-white/0 sm:before:-left-[40px] sm:before:w-[calc(40px)] dark:before:from-black dark:before:to-black/0"
				ref={refContainer}
			>
				<div
					className="xs:-ml-12 scrollbar-hidden -my-2 -ml-6 w-dvw !max-w-none overflow-x-auto overflow-y-hidden py-2 sm:-ml-[40px] sm:w-[calc(100%+40px+var(--offset))]"
					style={{ '--offset': `${sideOffset}px` } as React.CSSProperties}
					{...events}
					ref={refScroller}
				>
					<div className="xs:before:w-10 xs:after:w-10 flex !max-w-none gap-2 before:w-4 before:shrink-0 after:w-4 after:shrink-0 sm:before:w-[calc(40px-0.5rem)] sm:after:w-[calc(40px-0.5rem)]">
						{categories.map((item, index) => (
							<AnimatedContent
								direction="horizontal"
								delay={index * 50}
								scale={0.75}
								distance={50}
								config={{ tension: 60, friction: 15 }}
								rootMargin="0px 50px 0px 0px"
								key={item.id}
							>
								<button
									className={cn(
										'xs:py-2 xs:px-4 rounded-2xl border px-5 py-2 text-xs leading-none font-bold tracking-tight whitespace-nowrap uppercase transition-all select-none',
										category === item.id &&
											'bg-content-light pointer-events-none border-transparent text-white dark:bg-white dark:text-black',
										category !== item.id &&
											'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 active:scale-85 active:duration-150 dark:border-white/25 dark:hover:border-white dark:hover:text-white',
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

			<div className="layout:mt-12 mt-8 sm:mt-12">
				<div className="flex gap-8">
					<div className="flex aspect-[14/16] w-[360px] shrink-0 items-center justify-center rounded-xl bg-black/5 text-xs font-bold uppercase dark:bg-white/10">
						Some project
					</div>

					<div className="flex aspect-[14/16] w-[360px] shrink-0 items-center justify-center rounded-xl bg-black/5 text-xs font-bold uppercase dark:bg-white/10">
						Some project
					</div>

					<div className="flex aspect-[14/16] w-[360px] shrink-0 items-center justify-center rounded-xl bg-black/5 text-xs font-bold uppercase dark:bg-white/10">
						Some project
					</div>

					<div className="flex aspect-[14/16] w-[360px] shrink-0 items-center justify-center rounded-xl bg-black/5 text-xs font-bold uppercase dark:bg-white/10">
						Some project
					</div>

					<div className="flex aspect-[14/16] w-[360px] shrink-0 items-center justify-center rounded-xl bg-black/5 text-xs font-bold uppercase dark:bg-white/10">
						Some project
					</div>
				</div>

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
