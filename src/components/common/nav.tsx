'use client'

import { useTranslations } from 'next-intl'

import AnimatedContent from '@/components/animated/animated-content'
import { scrollToSection } from '@/utils/scroll-to-section'
import { cn } from '@/utils/tailwind-cn'

const NAV_DISTANCE = 65
const NAV_TENSION = 60
const NAV_FRICTION = 15
const NAV_ROOT_MARGIN = '65px 0px 0px'
const DELAY_INCREMENT = 100

type Props = {
	slot: 'header' | 'page'
}

export function Nav({ slot }: Props) {
	const __ = useTranslations('Default')

	const linkClass = cn(
		'px-2 py-1 transition-colors hover:bg-white  text-black/60 text-[15px] border border-transparent focus-visible:border-accent-blue focus-visible:text-accent-blue transition-all',
		'dark:text-white/50 dark:hover:bg-black dark:hover:text-white hover:shadow-sm hover:text-content-light dark:hover:shadow-md dark:hover:shadow-white/10',
	)

	return (
		<div
			className={cn(
				'xs:h-10 h-9 items-center gap-2 select-none',
				slot === 'header' && 'layout:hidden hidden min-[960px]:flex',
				slot === 'page' &&
					'layout:flex layout-sm:fixed before:bg-glass-light/65 dark:before:bg-glass-dark/65 absolute top-10 right-11 z-50 -mr-2 hidden px-2 before:absolute before:inset-0 before:-translate-y-full before:rounded-xl before:opacity-0 before:backdrop-blur-xs before:transition-[opacity,transform] before:duration-1000 [&:has([data-state="open"])]:before:translate-y-0 [&:has([data-state="open"])]:before:opacity-100',
			)}
		>
			<AnimatedContent
				distance={NAV_DISTANCE}
				config={{ tension: NAV_TENSION, friction: NAV_FRICTION }}
				delay={DELAY_INCREMENT}
				reverse
				rootMargin={NAV_ROOT_MARGIN}
			>
				<a href="#about" className={linkClass} onClick={(e) => scrollToSection(e, '#about')} aria-controls="about">
					{__('navigation.about')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={NAV_DISTANCE}
				config={{ tension: NAV_TENSION, friction: NAV_FRICTION }}
				delay={DELAY_INCREMENT * 2}
				reverse
				rootMargin={NAV_ROOT_MARGIN}
			>
				<a href="#skills" className={linkClass} onClick={(e) => scrollToSection(e, '#skills')} aria-controls="skills">
					{__('navigation.skills')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={NAV_DISTANCE}
				config={{ tension: NAV_TENSION, friction: NAV_FRICTION }}
				delay={DELAY_INCREMENT * 3}
				reverse
				rootMargin={NAV_ROOT_MARGIN}
			>
				<a
					href="#projects"
					className={linkClass}
					onClick={(e) => scrollToSection(e, '#projects')}
					aria-controls="projects"
				>
					{__('navigation.projects')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={NAV_DISTANCE}
				config={{ tension: NAV_TENSION, friction: NAV_FRICTION }}
				delay={DELAY_INCREMENT * 4}
				reverse
				rootMargin={NAV_ROOT_MARGIN}
			>
				<a
					href="#journey"
					className={linkClass}
					onClick={(e) => scrollToSection(e, '#journey')}
					aria-controls="journey"
				>
					{__('navigation.journey')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={NAV_DISTANCE}
				config={{ tension: NAV_TENSION, friction: NAV_FRICTION }}
				delay={DELAY_INCREMENT * 5}
				reverse
				rootMargin={NAV_ROOT_MARGIN}
			>
				<a
					href="#contact"
					className={linkClass}
					onClick={(e) => scrollToSection(e, '#contact')}
					aria-controls="contact"
				>
					{__('navigation.contact')}
				</a>
			</AnimatedContent>
		</div>
	)
}
