'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useHaptic } from 'use-haptic'

import { AnimatedContent } from '@/components/animated/animated-content'
import { MotionDiv } from '@/components/animated/motion'
import { Section } from '@/components/ui/section'
import { Skill } from '@/components/ui/skill'
import { DEFAULT_MOTION_SPRING_CONFIG } from '@/config/motion'
import type { SkillCategories } from '@/data/skills'
import { SKILLS_LIST } from '@/data/skills'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import { SkillCategoryButton } from './category-button'

export function Skills() {
	const __ = useTranslations('Skills')
	const categories = __.raw('categories') as { id: SkillCategories; title: string }[]

	const { triggerHaptic } = useHaptic()

	const [selectedCategory, setSelectedCategory] = useState<SkillCategories>('front-end')

	const containerRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const [contentHeight, setContentHeight] = useState<number | null>(null)

	const skills = SKILLS_LIST.filter((item) =>
		(item.categories as readonly SkillCategories[]).includes(selectedCategory),
	)

	const updateHeight = useCallback(() => {
		const content = contentRef.current
		if (!content) return
		const nextHeight = content.offsetHeight
		setContentHeight((prev) => (prev === nextHeight ? prev : nextHeight))
	}, [])

	useResizeObserver(contentRef, updateHeight, { runOnMount: true })

	function handleChangeCategory(category: SkillCategories) {
		triggerHaptic()
		setSelectedCategory(category)
	}

	const containerHeight = contentHeight != null ? `${contentHeight}px` : 'auto'

	return (
		<Section classNameCenter="max-xs:pt-9" className="layout:border-t-0">
			<AnimatedContent>
				<h2 className="layout:mb-8 font-heading mb-8 block items-center text-5xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl md:max-w-full lg:static lg:block lg:h-auto lg:pr-0 lg:text-6xl dark:text-white">
					{__('title')}
				</h2>
			</AnimatedContent>

			<div className="xs:gap-2 flex flex-wrap gap-1">
				{categories.map((item) => (
					<SkillCategoryButton
						key={item.id}
						category={item}
						selected={selectedCategory === item.id}
						onSelect={() => handleChangeCategory(item.id)}
					/>
				))}
			</div>

			<AnimatedContent>
				<hr className="xs:my-8 my-6 border-t border-black/10 dark:border-white/15 sm:dark:border-white/20" />

				<div
					ref={containerRef}
					className="h-[var(--height)] [transition:height_500ms_ease]"
					style={{ '--height': containerHeight }}
				>
					<MotionDiv layout className="xs:gap-2 flex flex-wrap gap-1 md:gap-3">
						<div ref={contentRef} className="xs:gap-2 flex flex-wrap gap-1 md:gap-3">
							{skills.map((item, index) => (
								<MotionDiv
									key={item.title}
									layout
									initial={{ opacity: 0, y: 40, scale: 0.8 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -40, scale: 0.8 }}
									transition={{ ...DEFAULT_MOTION_SPRING_CONFIG, delay: index * 0.015 }}
								>
									<Skill skill={item} />
								</MotionDiv>
							))}
						</div>
					</MotionDiv>
				</div>
			</AnimatedContent>
		</Section>
	)
}
