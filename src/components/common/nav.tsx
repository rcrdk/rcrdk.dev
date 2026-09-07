'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { AnimatedContent } from '@/components/animated/animated-content'
import { NavHoverBackground } from '@/components/common/nav-hover-background'
import { NavLink } from '@/components/common/nav-link'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { useRelativeRect } from '@/hooks/use-relative-rect'
import { trackEvent } from '@/lib/track-event'
import { cn, scrollToSection } from '@/utils'

const NAV_DISTANCE = 65
const NAV_TENSION = 60
const NAV_FRICTION = 15
const NAV_ROOT_MARGIN = '65px 0px 0px'
const DELAY_INCREMENT = 100

const LINK_CLASSNAME = cn(
	'squircle-rounded focus-visible:border-accent-blue focus-visible:text-accent-blue block rounded-2xl border border-transparent px-3.5 py-2.5 text-sm text-black/60 transition-colors duration-300 hover:text-black dark:text-white/50 dark:hover:text-white',
	'focus-visible:ring-accent-blue/40 cursor-pointer outline-none focus-visible:ring-4 dark:text-white/50',
)

const ITEMS = [
	{ href: '#about', label: 'navigation.about' },
	{ href: '#experiences', label: 'navigation.experiences' },
	{ href: '#education', label: 'navigation.education' },
	{ href: '#skills', label: 'navigation.skills' },
	{ href: '#contact', label: 'navigation.contact' },
]

interface NavProps {
	slot: 'header' | 'page'
}

export function Nav({ slot }: Readonly<NavProps>) {
	const [containerHovered, setContainerHovered] = useState(false)
	const [hoveredHref, setHoveredHref] = useState<string | null>(null)

	const __ = useTranslations('Default')

	const contentRef = useRef<HTMLDivElement>(null)
	const linkRefs = useRef<(HTMLDivElement | null)[]>([])

	const isSlotHeader = slot === 'header'
	const isSlotPage = slot === 'page'
	const showBackground = containerHovered && Boolean(hoveredHref)

	const getHoveredElement = useCallback(() => {
		const hoveredIndex = ITEMS.findIndex((item) => item.href === hoveredHref)
		if (hoveredIndex < 0) return null

		return linkRefs.current.at(hoveredIndex) ?? null
	}, [hoveredHref])

	const backgroundRect = useRelativeRect({
		containerRef: contentRef,
		getTarget: getHoveredElement,
		enabled: showBackground,
		runOnMount: false,
	})

	function handleMouseLeave() {
		setContainerHovered(false)
		setHoveredHref(null)
	}

	return (
		<div
			data-nosnippet
			className={cn(
				'relative select-none',
				isSlotHeader && 'layout:hidden hidden min-[960px]:flex',
				isSlotPage &&
					'layout:flex layout-sm:fixed before:bg-glass-light/65 dark:before:bg-glass-dark/65 before:squircle-rounded absolute top-10 right-11 z-50 -mr-2 hidden before:absolute before:inset-0 before:-translate-y-full before:rounded-xl before:opacity-0 before:backdrop-blur-xs before:transition-[opacity,transform] before:duration-1000 [&:has([data-state="open"])]:before:translate-y-0 [&:has([data-state="open"])]:before:opacity-100',
			)}
			onMouseEnter={() => setContainerHovered(true)}
			onMouseLeave={handleMouseLeave}
		>
			<div ref={contentRef} className="relative flex items-center">
				<NavHoverBackground rect={showBackground ? backgroundRect : null} />

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
							className={LINK_CLASSNAME}
							onClick={(e) => {
								trackEvent(ANALYTICS_EVENTS.navClick, { section: item.href.replace('#', '') })
								scrollToSection(e, item.href)
							}}
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
