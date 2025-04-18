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
