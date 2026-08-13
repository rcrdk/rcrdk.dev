'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { ContactCtaBox } from '@/app/(landing)/sections/contact/cta-box'
import { AnimatedContent } from '@/components/animated/animated-content'
import { FollowCursor } from '@/components/animated/follow-cursor'
import { RickRollingGameTaskButton } from '@/components/game/tasks/rickrolling-task'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { BUTTONS, EXTERNAL_BUTTON_LINK_PROPS } from '@/constants/contact'
import { useGame } from '@/hooks/use-game'

const INITIAL_DELAY = 250
const DELAY_INCREMENT = 50
const TEXT_DELAY = 250
const RICK_ROLLING_DELAY = 450
const DIVIDER_DELAY = 500
const CTA_BOX_DELAY = 550

const RICK_ROLLING_CURSOR = {
	backgroundImage: 'https://media1.tenor.com/m/SSY2V0RrU3IAAAAd/rick-roll-rick-rolled.gif',
	rotationFactor: 50,
	cardWidth: '400px',
	offsetX: -200,
	offsetY: -200,
} as const

export function Contact() {
	const [showAnimated, setShowAnimated] = useState(false)

	const __ = useTranslations('Contact')
	const { isGameActive } = useGame()

	return (
		<Section>
			<AnimatedContent>
				<h2 className="layout:mb-8 font-heading xs:text-5xl mb-8 block text-4xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl lg:text-6xl dark:text-white">
					{__('title')}
				</h2>
			</AnimatedContent>

			<div className="layout:mt-8 mt-8 sm:mt-12">
				<AnimatedContent delay={TEXT_DELAY}>
					<p
						className="text-lg text-balance md:pl-40 [&_a]:underline"
						dangerouslySetInnerHTML={{ __html: __.raw('text') }}
					/>
				</AnimatedContent>

				<ul className="mt-16 flex flex-wrap gap-2 sm:gap-3">
					{BUTTONS.map(({ labelKey, href, Icon, analytics }, index) => (
						<li key={labelKey}>
							<AnimatedContent delay={INITIAL_DELAY + index * DELAY_INCREMENT}>
								<Button
									{...EXTERNAL_BUTTON_LINK_PROPS}
									href={href}
									aria-label={__(`buttons.${labelKey}`)}
									analytics={{
										name: analytics.name,
										data: { ...analytics.data, section: 'contact' },
									}}
								>
									<Icon aria-hidden />
								</Button>
							</AnimatedContent>
						</li>
					))}

					{isGameActive && (
						<li className="layout:block hidden">
							<AnimatedContent delay={RICK_ROLLING_DELAY}>
								<RickRollingGameTaskButton onShowAnimated={setShowAnimated} />
							</AnimatedContent>
						</li>
					)}

					<li className="w-full grow self-center sm:w-auto">
						<AnimatedContent delay={DIVIDER_DELAY}>
							<hr className="mx-6 my-6 h-12 grow self-center border-t-0 border-l border-black/10 sm:mx-0 sm:h-auto sm:border-t sm:border-l-0 lg:mx-5 lg:my-0 dark:border-white/15" />
						</AnimatedContent>
					</li>
				</ul>

				<AnimatedContent delay={CTA_BOX_DELAY}>
					<ContactCtaBox />
				</AnimatedContent>
			</div>

			{showAnimated && (
				<FollowCursor
					{...RICK_ROLLING_CURSOR}
					className="pointer-events-none fixed inset-1/2 z-9999 opacity-0 transition-opacity duration-500 in-hover:!opacity-100 [&_>_div]:!max-w-none"
				/>
			)}
		</Section>
	)
}
