'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { SkillsList } from '@/app/(landing)/sections/skills/skills-list'
import { AnimatedContent } from '@/components/animated/animated-content'
import { Section } from '@/components/ui/section'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import type { SkillCategories, SkillItem } from '@/data/skills'
import { SKILLS_LIST } from '@/data/skills'
import { useHaptics } from '@/hooks/use-haptics'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import { trackEvent } from '@/lib/track-event'
import { SkillCategoryButton } from './category-button'

const SOFT_SKILLS_CATEGORY: SkillCategories = 'soft-skills'

const SOFT_SKILL_TRANSLATION_KEYS = new Set<string>([
	'communication',
	'team-collaboration',
	'problem-solving',
	'critical-thinking',
	'code-review',
	'time-management',
	'technical-writing',
	'continuous-learning',
	'ownership',
	'ai-assisted-development',
])

type SkillCategoryOption = { id: SkillCategories; title: string }

const toCategoryOptions = (value: unknown): SkillCategoryOption[] => (Array.isArray(value) ? value : [])

export function Skills() {
	const __ = useTranslations('Skills')
	const categories = toCategoryOptions(__.raw('categories'))

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

	function getSkillLabel(skill: SkillItem) {
		const isSoftSkill = selectedCategory === SOFT_SKILLS_CATEGORY && SOFT_SKILL_TRANSLATION_KEYS.has(skill.title)
		if (!isSoftSkill) return undefined

		return __(`softSkills.${skill.title}`)
	}

	useResizeObserver(contentRef, updateHeight, { runOnMount: true })

	const containerHeight = Number.isFinite(contentHeight) ? `${contentHeight}px` : 'auto'

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
					<SkillsList skills={skills} contentRef={contentRef} getLabel={getSkillLabel} />
				</div>
			</AnimatedContent>
		</Section>
	)
}
