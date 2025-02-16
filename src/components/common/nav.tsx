'use client'

import { useTranslations } from 'next-intl'

import AnimatedContent from '@/components/animated/animated-content'
import { scrollToSection } from '@/utils/scroll-to-section'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	slot: 'header' | 'page'
}

export function Nav({ slot }: Props) {
	const __ = useTranslations('Default')

	const containerClass = cn(
		'xs:h-10 h-9 items-center gap-2 select-none',
		slot === 'header' && 'layout:hidden hidden min-[960px]:flex',
		slot === 'page' &&
			'[&:has([data-state="open"])]:before:opacity-100 [&:has([data-state="open"])]:before:translate-y-0 layout:flex absolute layout-sm:fixed top-10 right-11 hidden z-50 before:rounded-xl before:absolute before:-translate-y-full before:inset-0 before:bg-black/5 dark:before:bg-white/10 before:backdrop-blur-xs px-2 -mr-2 before:transition-all before:duration-1000 before:opacity-0',
	)

	const linkClass = cn(
		'px-2 py-1 transition-colors hover:bg-white  text-black/60 text-[15px] border border-transparent focus-visible:border-accent-blue focus-visible:text-accent-blue transition-all',
		'dark:text-white/50 dark:hover:bg-black dark:hover:text-white hover:shadow-sm hover:text-content-light dark:hover:shadow-md dark:hover:shadow-white/10',
	)

	return (
		<div className={containerClass}>
			<AnimatedContent
				distance={65}
				config={{ tension: 60, friction: 15 }}
				delay={100}
				reverse
				rootMargin="65px 0px 0px"
			>
				<a href="#about" className={linkClass} onClick={(e) => scrollToSection(e, '#about')}>
					{__('navigation.about')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={65}
				config={{ tension: 60, friction: 15 }}
				delay={200}
				reverse
				rootMargin="65px 0px 0px"
			>
				<a href="#skills" className={linkClass} onClick={(e) => scrollToSection(e, '#skills')}>
					{__('navigation.skills')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={65}
				config={{ tension: 60, friction: 15 }}
				delay={300}
				reverse
				rootMargin="65px 0px 0px"
			>
				<a href="" className={linkClass} onClick={(e) => scrollToSection(e, '#projects')}>
					{__('navigation.projects')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={65}
				config={{ tension: 60, friction: 15 }}
				delay={400}
				reverse
				rootMargin="65px 0px 0px"
			>
				<a href="" className={linkClass} onClick={(e) => scrollToSection(e, '#journey')}>
					{__('navigation.journey')}
				</a>
			</AnimatedContent>

			<AnimatedContent
				distance={65}
				config={{ tension: 60, friction: 15 }}
				delay={500}
				reverse
				rootMargin="65px 0px 0px"
			>
				<a href="" className={linkClass} onClick={(e) => scrollToSection(e, '#contact')}>
					{__('navigation.contact')}
				</a>
			</AnimatedContent>
		</div>
	)
}
