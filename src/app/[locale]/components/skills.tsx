'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

import { SkillItem } from '@/app/[locale]/components/skill-item'
import AnimatedContent from '@/components/animated/animated-content'
import { Section } from '@/components/ui/section'
import { SkillCategories, SKILLS } from '@/data/skills'
import { cn } from '@/utils/tailwind-cn'

export function Skills() {
	const __ = useTranslations('Skills')
	const categories = __.raw('categories') as { id: SkillCategories; title: string }[]

	const [selectedCategory, setSelectedCategory] = useState<SkillCategories>('front-end')

	const skills = useMemo(() => {
		return SKILLS.filter((item) => item.categories.includes(selectedCategory))
	}, [selectedCategory])

	function handleChangeCategory(category: SkillCategories) {
		setSelectedCategory(category)
	}

	return (
		<Section classNameCenter="max-xs:pt-9" className="layout:border-t-0">
			<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} rootMargin="0px 0px 125px">
				<h2 className="layout:mb-8 font-heading layout:text-6xl mb-8 block items-center text-3xl font-black tracking-tight text-balance sm:mb-12 sm:text-4xl md:max-w-full lg:static lg:block lg:h-auto lg:pr-0 dark:text-white">
					{__('title')}
				</h2>
			</AnimatedContent>

			<div className="flex flex-wrap gap-2">
				{categories.map((item) => (
					<AnimatedContent
						distance={125}
						rootMargin="0px 0px 125px"
						config={{ tension: 60, friction: 15 }}
						key={item.id}
					>
						<button
							className={cn(
								'rounded-2xl border px-4 py-2 text-xs leading-none font-bold tracking-tight whitespace-nowrap uppercase transition-all select-none',
								selectedCategory === item.id &&
									'bg-content-light pointer-events-none border-transparent text-white dark:bg-white dark:text-black',
								selectedCategory !== item.id &&
									'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 active:scale-85 active:duration-150 dark:border-white/15 dark:hover:border-white dark:hover:text-white',
							)}
							tabIndex={selectedCategory === item.id ? -1 : 0}
							onClick={() => handleChangeCategory(item.id)}
						>
							{item.title}
						</button>
					</AnimatedContent>
				))}
			</div>

			<hr className="my-8 border-t border-black/10 dark:border-white/15 sm:dark:border-white/20" />

			<div className="flex flex-wrap gap-2">
				{skills.map((item) => (
					<SkillItem name={item.name} key={item.name} />
				))}
			</div>
		</Section>
	)
}
