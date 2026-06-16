'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { AnimatedContent } from '@/components/animated/animated-content'
import { MotionDiv } from '@/components/animated/motion'
import { Section } from '@/components/ui/section'
import { Skill } from '@/components/ui/skill'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { DEFAULT_MOTION_SPRING_CONFIG } from '@/config/motion'
import type { SkillCategories } from '@/data/skills'
import { SKILLS_LIST } from '@/data/skills'
import { useHaptics } from '@/hooks/use-haptics'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import { trackEvent } from '@/lib/track-event'
import { SkillCategoryButton } from './category-button'

type SoftSkillTranslationKey =
	| 'communication'
	| 'team-collaboration'
	| 'problem-solving'
	| 'critical-thinking'
	| 'code-review'
	| 'time-management'
	| 'technical-writing'
	| 'continuous-learning'
	| 'ownership'
	| 'ai-assisted-development'

export function Skills() {
	const __ = useTranslations('Skills')
	const categories = __.raw('categories') as { id: SkillCategories; title: string }[]

	const { triggerHaptic } = useHaptics()

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

	function handleChangeCategory(category: SkillCategories) {
		trackEvent(ANALYTICS_EVENTS.skillsCategory, { category })
		triggerHaptic()
		setSelectedCategory(category)
	}

	useResizeObserver(contentRef, updateHeight, { runOnMount: true })

	const containerHeight = contentHeight != null ? `${contentHeight}px` : 'auto'

	return (
		<Section classNameCenter="max-xs:pt-9" className="layout:border-t- relative z-1">
			<AnimatedContent>
				<h2 className="layout:mb-8 font-heading xs:text-5xl mb-8 block items-center text-4xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl md:max-w-full lg:static lg:block lg:h-auto lg:pr-0 lg:text-6xl dark:text-white">
					{__('title')}
				</h2>
			</AnimatedContent>

			<AnimatedContent>
				<div className="scrollbar-hidden max-xs:-mx-6 max-xs:px-6 max-sm:-mx-12 max-sm:flex max-sm:w-screen max-sm:!max-w-screen max-sm:overflow-x-auto max-sm:px-12 lg:px-0">
					<div className="squircle-rounded skills-tablet:flex-wrap inline-flex min-w-fit items-center rounded-2xl bg-black/5 sm:!pe-[20%] md:!pe-[30%] lg:!pe-0 dark:bg-white/10">
						{categories.map((item) => (
							<SkillCategoryButton
								key={item.id}
								category={item}
								selected={selectedCategory === item.id}
								onSelect={() => handleChangeCategory(item.id)}
							/>
						))}
					</div>
				</div>
			</AnimatedContent>

			<AnimatedContent>
				<hr className="xs:my-8 my-6 border-t border-black/10 dark:border-white/15 sm:dark:border-white/20" />

				<div
					ref={containerRef}
					className="h-[var(--height)] [transition:height_500ms_ease]"
					style={{ '--height': containerHeight }}
				>
					<MotionDiv layout className="xs:gap-2 flex flex-wrap gap-1 md:gap-3">
						<div ref={contentRef} className="xs:gap-2 flex flex-wrap gap-1 md:gap-3">
							{skills.map((item, index) => {
								const label =
									selectedCategory === 'soft-skills'
										? __(`softSkills.${item.title as SoftSkillTranslationKey}`)
										: undefined

								return (
									<MotionDiv
										key={item.title}
										layout
										initial={{ opacity: 0, y: 40, scale: 0.8 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: -40, scale: 0.8 }}
										transition={{ ...DEFAULT_MOTION_SPRING_CONFIG, delay: index * 0.015 }}
									>
										<Skill skill={item} label={label} />
									</MotionDiv>
								)
							})}
						</div>
					</MotionDiv>
				</div>
			</AnimatedContent>
		</Section>
	)
}
