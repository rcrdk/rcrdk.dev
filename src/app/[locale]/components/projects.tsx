'use client'

import 'swiper/css'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { IconChevronDown } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { ProjectDetails } from '@/app/[locale]/components/project-details'
import { ProjectItem } from '@/app/[locale]/components/project-item'
import AnimatedContent from '@/components/animated/animated-content'
import { Section } from '@/components/ui/section'
import { ProjectCategories, PROJECTS, ProjectTranslatedObject } from '@/data/projects'
import { LocalesType } from '@/i18n/routing'
import { cn } from '@/utils/tailwind-cn'

export function Projects() {
	const refContainer = useRef<HTMLDivElement>(null)

	const swiperRef = useRef<SwiperRef>(null)

	const [projectSelected, setProjectSelected] = useState<ProjectTranslatedObject>()
	const [selectedCategory, setSelectedCategory] = useState<ProjectCategories>('highlights')
	const [sideOffset, setSideOffset] = useState(0)

	const __ = useTranslations('Projects')
	const locale = useLocale() as LocalesType
	const categories = __.raw('categories') as { id: ProjectCategories; label: string }[]

	const handleChangeCategory = useCallback((id: ProjectCategories) => {
		setSelectedCategory(id)
	}, [])

	const handleSelectProject = useCallback((project?: ProjectTranslatedObject) => {
		setProjectSelected(project)
	}, [])

	const currentCategory = useMemo(
		() => categories.find((item) => item.id === selectedCategory),
		[categories, selectedCategory],
	)

	const projects = useMemo(() => {
		const items: ProjectTranslatedObject[] = PROJECTS.map((project) => ({
			...project,
			intro: project.intro[locale],
			description: project.description[locale],
		}))

		if (selectedCategory === 'highlights') {
			return items.filter((project) => project.highlighted)
		} else {
			return items.filter((project) => project.categories.includes(selectedCategory))
		}
	}, [locale, selectedCategory])

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
	}, [projects])

	return (
		<Section>
			<Dropdown.Root>
				<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} rootMargin="0px 0px 125px">
					<Dropdown.Trigger asChild>
						<button className="group w-full cursor-pointer text-start outline-none">
							<h2 className="font-heading flex items-center gap-6 text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white">
								{currentCategory?.label ?? __('title')}

								<span
									className={cn(
										'mt-3 flex size-9 shrink-0 items-center justify-center rounded-full bg-black/5 transition-all dark:bg-white/10',
										'group-focus-visible:!border-accent-blue group-focus-visible:bg-accent-blue/10 dark:group-focus-visible:bg-accent-blue/20 group-focus-visible:ring-accent-blue/40 group-focus-visible:text-accent-blue group-focus-visible:ring-4',
										'group-hover:bg-black/10 dark:bg-white/10 dark:group-hover:bg-white/15',
									)}
								>
									<IconChevronDown className="size-6" />
								</span>
							</h2>
						</button>
					</Dropdown.Trigger>
				</AnimatedContent>

				<Dropdown.Portal>
					<Dropdown.Content
						className="data-[state='open']:animate-dropdown-in data-[state='closed']:animate-dropdown-out shadow-dialog dark:bg-dropdown-dark flex [transform-origin:var(--radix-dropdown-menu-content-transform-origin)] flex-col divide-y divide-black/10 rounded-xl border border-black/20 bg-white px-5 py-6 whitespace-nowrap will-change-transform dark:divide-white/15 dark:border-white/20"
						align="start"
						side="bottom"
						sideOffset={24}
					>
						{categories.map((category) => (
							<Dropdown.Item key={category.id} disabled={selectedCategory === category.id} asChild>
								<button
									className={cn(
										'font-heading rounded-2xl border-0 px-5 py-3 text-start text-2xl leading-none font-bold tracking-tight whitespace-nowrap text-black transition-all outline-none select-none dark:text-white',
										selectedCategory === category.id
											? 'bg-black/5 dark:bg-white/10'
											: 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10',
									)}
									tabIndex={selectedCategory === category.id ? -1 : 0}
									onClick={() => handleChangeCategory(category.id)}
								>
									{category.label}
								</button>
							</Dropdown.Item>
						))}
					</Dropdown.Content>
				</Dropdown.Portal>
			</Dropdown.Root>

			<div
				className="xs:before:-left-12 xs:before:w-12 relative w-full before:absolute before:inset-y-0 before:-left-6 before:z-10 before:w-6 before:bg-gradient-to-r before:from-white before:to-white/0 max-[929px]:before:hidden sm:before:-left-[40px] sm:before:w-[calc(40px)] dark:before:from-black dark:before:to-black/0"
				ref={refContainer}
			/>

			<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} rootMargin="0px 0px 125px">
				<div
					className={cn(
						'scrollbar-hidden relative !max-w-none overflow-hidden max-[929px]:!w-screen min-[929px]:w-[calc(100%+64px+var(--offset))]',
						'layout:mt-12 xs:-ml-12 mt-12 -ml-6 min-[929px]:!-ml-16 sm:mt-12 sm:-ml-16 md:-ml-20',
						'xs:px-12 px-6 min-[929px]:!px-16 sm:px-16 md:px-20 lg:pr-10',
						'max-[929px]:before:hidden sm:before:absolute sm:before:inset-y-0 sm:before:left-0 sm:before:z-10 sm:before:w-16 sm:before:bg-gradient-to-r sm:before:from-white sm:before:to-white/0 dark:sm:before:from-black dark:sm:before:to-black/0',
					)}
					style={{ '--offset': `${sideOffset}px` } as React.CSSProperties}
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
						{projects.map((item) => (
							<SwiperSlide
								className="!flex !min-h-[360px] !w-[240px] !max-w-none min-sm:!min-h-[400px] min-sm:!w-[290px]"
								key={item.id}
							>
								<ProjectItem project={item} onOpenChange={() => handleSelectProject(item)} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</AnimatedContent>

			<ProjectDetails open={!!projectSelected} onOpenChange={handleSelectProject} project={projectSelected} />
		</Section>
	)
}
