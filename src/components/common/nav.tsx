'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { AnimatedContent } from '@/components/animated/animated-content'
import { MotionDiv } from '@/components/animated/motion'
import { NavLink } from '@/components/common/nav-link'
import { DEFAULT_MOTION_SPRING_CONFIG } from '@/config/motion'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import { scrollToSection } from '@/utils/scroll-to-section'
import { cn } from '@/utils/tailwind-cn'

const NAV_DISTANCE = 65
const NAV_TENSION = 60
const NAV_FRICTION = 15
const NAV_ROOT_MARGIN = '65px 0px 0px'
const DELAY_INCREMENT = 100

const ITEMS = [
	{ href: '#about', label: 'navigation.about' },
	{ href: '#experiences', label: 'navigation.experiences' },
	{ href: '#education', label: 'navigation.education' },
	{ href: '#skills', label: 'navigation.skills' },
	{ href: '#contact', label: 'navigation.contact' },
]

interface Props {
	slot: 'header' | 'page'
}

type BackgroundRect = { left: number; top: number; width: number; height: number } | null

export function Nav({ slot }: Readonly<Props>) {
	const [containerHovered, setContainerHovered] = useState(false)
	const [hoveredHref, setHoveredHref] = useState<string | null>(null)
	const [backgroundRect, setBackgroundRect] = useState<BackgroundRect>(null)

	const __ = useTranslations('Default')

	const contentRef = useRef<HTMLDivElement>(null)
	const linkRefs = useRef<(HTMLDivElement | null)[]>([])

	const linkClass = cn(
		'squircle-rounded focus-visible:border-accent-blue focus-visible:text-accent-blue border border-transparent px-2 py-1 text-[15px] text-black/60 transition-colors',
		'focus-visible:ring-accent-blue/40 cursor-pointer outline-none focus-visible:ring-4 dark:text-white/50',
	)

	const isSlotHeader = slot === 'header'
	const isSlotPage = slot === 'page'
	const showBackground = containerHovered && hoveredHref != null

	const updateBackgroundRect = useCallback(() => {
		const content = contentRef.current

		if (!content || !hoveredHref) {
			setBackgroundRect(null)
			return
		}

		const index = ITEMS.findIndex((i) => i.href === hoveredHref)
		const linkEl = linkRefs.current[index]
		if (!linkEl) {
			setBackgroundRect(null)
			return
		}

		const contentRect = content.getBoundingClientRect()
		const linkRect = linkEl.getBoundingClientRect()

		setBackgroundRect({
			left: linkRect.left - contentRect.left,
			top: linkRect.top - contentRect.top,
			width: linkRect.width,
			height: linkRect.height,
		})
	}, [hoveredHref])

	useEffect(() => updateBackgroundRect(), [updateBackgroundRect])

	useResizeObserver(contentRef, updateBackgroundRect, { enabled: showBackground, runOnMount: false })

	const showBackgroundHovered = showBackground && backgroundRect

	return (
		<div
			className={cn(
				'xs:h-10 relative h-9 select-none',
				isSlotHeader && 'layout:hidden hidden min-[960px]:flex',
				isSlotPage &&
					'layout:flex layout-sm:fixed before:bg-glass-light/65 dark:before:bg-glass-dark/65 before:squircle-rounded absolute top-10 right-11 z-50 -mr-2 hidden before:absolute before:inset-0 before:-translate-y-full before:rounded-xl before:opacity-0 before:backdrop-blur-xs before:transition-[opacity,transform] before:duration-1000 [&:has([data-state="open"])]:before:translate-y-0 [&:has([data-state="open"])]:before:opacity-100',
			)}
			onMouseEnter={() => setContainerHovered(true)}
			onMouseLeave={() => {
				setContainerHovered(false)
				setHoveredHref(null)
			}}
		>
			<div ref={contentRef} className={cn('relative flex items-center gap-2', isSlotPage && 'px-2')}>
				{showBackgroundHovered && (
					<MotionDiv
						className="squircle-rounded pointer-events-none absolute z-0 rounded-xl bg-white shadow-sm dark:bg-black dark:shadow-md dark:shadow-white/10"
						transition={DEFAULT_MOTION_SPRING_CONFIG}
						initial={false}
						animate={{
							left: backgroundRect.left,
							top: backgroundRect.top,
							width: backgroundRect.width,
							height: backgroundRect.height,
						}}
					/>
				)}

				{ITEMS.map((item, index) => (
					<AnimatedContent
						distance={NAV_DISTANCE}
						config={{ tension: NAV_TENSION, friction: NAV_FRICTION }}
						delay={DELAY_INCREMENT * (index + 1)}
						reverse
						rootMargin={NAV_ROOT_MARGIN}
						key={item.href}
					>
						<NavLink
							href={item.href}
							className={linkClass}
							onClick={(e) => scrollToSection(e, item.href)}
							aria-controls={item.href}
							showActive={hoveredHref === item.href}
							onHoverChange={(hovered) => (hovered ? setHoveredHref(item.href) : undefined)}
							linkRef={(el) => {
								linkRefs.current[index] = el
							}}
						>
							{__(item.label)}
						</NavLink>
					</AnimatedContent>
				))}
			</div>
		</div>
	)
}
