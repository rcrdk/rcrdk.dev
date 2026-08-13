'use client'

import type { RefObject } from 'react'

import { MotionDiv } from '@/components/animated/motion'
import { Skill } from '@/components/ui/skill'
import { DEFAULT_MOTION_SPRING_CONFIG } from '@/config/motion'
import type { SkillItem } from '@/data/skills'

const DELAY_INCREMENT = 0.015

const ITEM_ANIMATION = {
	initial: { opacity: 0, y: 40, scale: 0.8 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: -40, scale: 0.8 },
}

interface SkillsListProps {
	skills: SkillItem[]
	contentRef: RefObject<HTMLDivElement | null>
	getLabel: (skill: SkillItem) => string | undefined
}

export function SkillsList({ skills, contentRef, getLabel }: Readonly<SkillsListProps>) {
	return (
		<MotionDiv layout className="xs:gap-2 flex flex-wrap gap-1 md:gap-3">
			<div ref={contentRef} className="xs:gap-2 flex flex-wrap gap-1 md:gap-3">
				{skills.map((item, index) => (
					<MotionDiv
						key={item.title}
						layout
						{...ITEM_ANIMATION}
						transition={{ ...DEFAULT_MOTION_SPRING_CONFIG, delay: index * DELAY_INCREMENT }}
					>
						<Skill skill={item} label={getLabel(item)} />
					</MotionDiv>
				))}
			</div>
		</MotionDiv>
	)
}
