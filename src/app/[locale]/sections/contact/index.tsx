'use client'

import { useState } from 'react'
import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandSpotify,
	IconFileDescription,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { AnimatedContent } from '@/components/animated/animated-content'
import FollowCursor from '@/components/animated/follow-cursor'
import { RickRollingGameTaskButton } from '@/components/game/tasks/rickrolling-task'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { LINKS } from '@/config/links'
import { useGame } from '@/hooks/use-game'

const externalButtonLinkProps = {
	as: 'a',
	target: '_blank',
	size: 'lg',
	variant: 'outline',
	icon: true,
} as const

const defaultButtonProps = {
	as: 'a',
	target: '_blank',
	size: 'sm',
	variant: 'outline',
	className: 'xs:grow-0 grow bg-transparent dark:bg-transparent',
	haptic: true,
} as const

const BUTTONS = [
	{
		href: LINKS.linkedIn,
		labelKey: 'linkedin',
		Icon: IconBrandLinkedin,
	},
	{
		href: LINKS.github,
		labelKey: 'github',
		Icon: IconBrandGithub,
	},
	{
		href: LINKS.behance,
		labelKey: 'behance',
		Icon: IconBrandBehance,
	},
	{
		href: LINKS.discord,
		labelKey: 'discord',
		Icon: IconBrandDiscord,
	},
	{
		href: LINKS.spotify,
		labelKey: 'spotify',
		Icon: IconBrandSpotify,
	},
]

const INITIAL_DELAY = 250
const DELAY_INCREMENT = 50

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
				<AnimatedContent delay={250}>
					<p
						className="text-lg text-balance md:pl-40 [&_a]:underline"
						dangerouslySetInnerHTML={{ __html: __.raw('text') }}
					/>
				</AnimatedContent>

				<ul className="mt-16 flex flex-wrap gap-2 sm:gap-3">
					{BUTTONS.map(({ labelKey, href, Icon }, index) => {
						const delay = INITIAL_DELAY + index * DELAY_INCREMENT

						return (
							<li key={labelKey}>
								<AnimatedContent delay={delay}>
									<Button {...externalButtonLinkProps} href={href} aria-label={__(`buttons.${labelKey}`)}>
										<Icon aria-hidden />
									</Button>
								</AnimatedContent>
							</li>
						)
					})}

					{isGameActive && (
						<li className="layout:block hidden">
							<AnimatedContent delay={450}>
								<RickRollingGameTaskButton onShowAnimated={setShowAnimated} />
							</AnimatedContent>
						</li>
					)}

					<li className="w-full grow self-center sm:w-auto">
						<AnimatedContent delay={500}>
							<hr className="mx-6 my-6 h-12 grow self-center border-t-0 border-l border-black/10 sm:mx-0 sm:h-auto sm:border-t sm:border-l-0 lg:mx-5 lg:my-0 dark:border-white/15" />
						</AnimatedContent>
					</li>
				</ul>

				<AnimatedContent delay={550}>
					<div className="flex items-center gap-6 rounded-2xl bg-black/5 p-5 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 sm:mt-16 dark:bg-white/10">
						<p className="xs:text-start text-content-light/75 dark:text-content-dark/75 grow text-center text-[15px] text-balance">
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
			</div>

			{showAnimated && (
				<FollowCursor
					backgroundImage="https://media1.tenor.com/m/SSY2V0RrU3IAAAAd/rick-roll-rick-rolled.gif"
					rotationFactor={50}
					cardWidth="400px"
					offsetX={-200}
					offsetY={-200}
					className="pointer-events-none fixed inset-1/2 z-[9999] opacity-0 transition-opacity duration-500 in-hover:!opacity-100 [&_>_div]:!max-w-none"
				/>
			)}
		</Section>
	)
}
