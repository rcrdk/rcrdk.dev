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
		'xs:h-10 h-9 items-center gap-3',
		slot === 'header' && 'layout:hidden hidden min-[960px]:flex',
		slot === 'page' &&
			'layout:flex fixed top-10 right-11 hidden z-50 rounded-xl bg-white/90 backdrop-blur-xs dark:bg-black/90 px-3 -mr-3',
	)

	const linkClass = cn(
		'px-2 py-1 transition-colors hover:bg-black/5  text-black/60 text-[15px] border border-transparent focus-visible:border-accent-blue focus-visible:text-accent-blue',
		'dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white',
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
