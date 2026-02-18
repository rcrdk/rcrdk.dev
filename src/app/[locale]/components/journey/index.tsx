'use client'

import { useState } from 'react'
import { IconBrandLinkedin, IconFileDescription } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useHaptic } from 'use-haptic'

import AnimatedContent from '@/components/animated/animated-content'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { LINKS } from '@/config/links'
import { JourneyGroup } from './group'

type ExperiencesCollapse = 'work' | 'education'

export type JourneyExperience = {
	company: string
	url: string
	title: string
	time_range: string
	location: string
	info: string[]
}

const defaultButtonProps = {
	as: 'a',
	target: '_blank',
	size: 'sm',
	variant: 'outline',
	className: 'xs:grow-0 grow bg-transparent dark:bg-transparent',
	icon: true,
} as const

export function Journey() {
	const [open, setOpen] = useState<ExperiencesCollapse[]>([])

	const __ = useTranslations('Journey')
	const { triggerHaptic } = useHaptic()

	const workExperiences = __.raw('work_experience.list') as JourneyExperience[]
	const education = __.raw('education.list') as JourneyExperience[]

	function handleCollapse(collapse: ExperiencesCollapse) {
		triggerHaptic()
		setOpen((prev) => {
			if (prev.includes(collapse)) return prev
			return [...prev, collapse]
		})
	}

	return (
		<Section>
			<AnimatedContent>
				<h2 className="layout:mb-8 font-heading mb-8 block text-5xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl lg:text-6xl dark:text-white">
					{__('title')}
				</h2>
			</AnimatedContent>

			<AnimatedContent>
				<p
					className="xs:text-lg text-md xs:leading-loose mb-0 leading-[1.8] text-pretty"
					dangerouslySetInnerHTML={{ __html: __.raw('intro') }}
				/>
			</AnimatedContent>

			<AnimatedContent>
				<div className="mt-12 mb-8 divide-y divide-black/10 border-y border-black/10 dark:divide-white/15 dark:border-white/15 sm:dark:divide-white/20 sm:dark:border-white/20">
					<JourneyGroup
						title={__('work_experience.title')}
						items={workExperiences}
						open={open.includes('work')}
						onOpenChange={() => handleCollapse('work')}
					/>

					<JourneyGroup
						title={__('education.title')}
						items={education}
						open={open.includes('education')}
						onOpenChange={() => handleCollapse('education')}
					/>
				</div>
			</AnimatedContent>

			<AnimatedContent>
				<div className="flex items-center gap-6 rounded-2xl bg-black/5 p-5 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 dark:bg-white/10">
					<p className="xs:text-start text-content-light/75 dark:text-content-dark/75 text-center text-[15px] text-balance">
						{__('box.text')}
					</p>

					<div className="xs:w-auto flex w-full gap-2">
						<Button {...defaultButtonProps} href={LINKS.linkedIn}>
							<IconBrandLinkedin aria-hidden />
							<span className="font-semibold">{__('box.button.linkedin')}</span>
						</Button>

						<Button {...defaultButtonProps} href={LINKS.resume}>
							<IconFileDescription aria-hidden />
							<span className="font-semibold">{__('box.button.cv')}</span>
						</Button>
					</div>
				</div>
			</AnimatedContent>
		</Section>
	)
}
