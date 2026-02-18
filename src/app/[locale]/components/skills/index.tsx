'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useHaptic } from 'use-haptic'

import AnimatedContent from '@/components/animated/animated-content'
import { Section } from '@/components/ui/section'
import { SkillCategories, SKILLS } from '@/data/skills'
import { SkillCategoryButton } from './category-button'
import { SkillItem } from './item'

export function Skills() {
	const listRef = useRef<HTMLDivElement>(null)

	const __ = useTranslations('Skills')
	const categories = __.raw('categories') as { id: SkillCategories; title: string }[]

	const { triggerHaptic } = useHaptic()

	const [selectedCategory, setSelectedCategory] = useState<SkillCategories>('front-end')
	const [listHeight, setListHeight] = useState(0)

	const skills = SKILLS.filter((item) => item.categories.includes(selectedCategory))

	function handleChangeCategory(category: SkillCategories) {
		triggerHaptic()
		setSelectedCategory(category)
	}

	useEffect(() => {
		if (!listRef.current) return
		setListHeight(listRef.current.offsetHeight)
	}, [selectedCategory])

	return (
		<Section classNameCenter="max-xs:pt-9" className="layout:border-t-0">
			<AnimatedContent>
				<h2 className="layout:mb-8 font-heading layout:text-6xl mb-8 block items-center text-3xl font-black tracking-tight text-balance sm:mb-12 sm:text-4xl md:max-w-full lg:static lg:block lg:h-auto lg:pr-0 dark:text-white">
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

				<div className="[transition:height_500ms_ease]" style={{ height: `${listHeight}px` }}>
					<div className="xs:gap-2 flex flex-wrap gap-1 md:gap-3" ref={listRef}>
						{skills.map((item) => (
							<SkillItem skill={item} key={item.title.en} />
						))}
					</div>
				</div>
			</AnimatedContent>
		</Section>
	)
}
