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

import AnimatedContent from '@/components/animated/animated-content'
import FollowCursor from '@/components/animated/follow-cursor'
import { RickRollingGameTaskButton } from '@/components/game/tasks/rickrolling-task'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { LINKS } from '@/config/links'

export function Contact() {
	const [showAnimated, setShowAnimated] = useState(false)
	const __ = useTranslations('Contact')

	return (
		<Section>
			<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} rootMargin="0px 0px 125px">
				<h2 className="layout:mb-8 font-heading mb-8 block text-5xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl lg:text-6xl dark:text-white">
					{__('title')}
				</h2>
			</AnimatedContent>

			<div className="layout:mt-8 mt-8 sm:mt-12">
				<AnimatedContent distance={125} config={{ tension: 60, friction: 15 }} delay={250} rootMargin="0px 0px 125px">
					<p
						className="text-lg text-balance md:pl-40 [&_a]:underline"
						dangerouslySetInnerHTML={{ __html: __.raw('text') }}
					/>
				</AnimatedContent>

				<ul className="mt-16 flex flex-wrap gap-2 sm:gap-3">
					<li>
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={250}
							rootMargin="0px 0px 125px"
						>
							<Button
								as="a"
								href={LINKS.linkedIn}
								target="_blank"
								size="lg"
								variant="outline"
								icon
								aria-label={__('buttons.linkedin')}
							>
								<IconBrandLinkedin className="size-8" strokeWidth={1.5} />
							</Button>
						</AnimatedContent>
					</li>

					<li>
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={300}
							rootMargin="0px 0px 125px"
						>
							<Button
								as="a"
								href={LINKS.github}
								target="_blank"
								size="lg"
								variant="outline"
								icon
								aria-label={__('buttons.github')}
							>
								<IconBrandGithub className="size-8" strokeWidth={1.5} />
							</Button>
						</AnimatedContent>
					</li>

					<li>
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={350}
							rootMargin="0px 0px 125px"
						>
							<Button
								as="a"
								href={LINKS.behance}
								target="_blank"
								size="lg"
								variant="outline"
								icon
								aria-label={__('buttons.behance')}
							>
								<IconBrandBehance className="size-8" strokeWidth={1.5} />
							</Button>
						</AnimatedContent>
					</li>

					<li>
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={400}
							rootMargin="0px 0px 125px"
						>
							<Button
								as="a"
								href={LINKS.discord}
								target="_blank"
								size="lg"
								variant="outline"
								icon
								aria-label={__('buttons.discord')}
							>
								<IconBrandDiscord className="size-8" strokeWidth={1.5} />
							</Button>
						</AnimatedContent>
					</li>

					<li>
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={450}
							rootMargin="0px 0px 125px"
						>
							<Button
								as="a"
								href={LINKS.spotify}
								target="_blank"
								size="lg"
								variant="outline"
								icon
								aria-label={__('buttons.spotify')}
							>
								<IconBrandSpotify className="size-8" strokeWidth={1.5} />
							</Button>
						</AnimatedContent>
					</li>

					<li className="layout:block hidden">
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={450}
							rootMargin="0px 0px 125px"
						>
							<RickRollingGameTaskButton onShowAnimated={setShowAnimated} />
						</AnimatedContent>
					</li>

					<li className="w-full grow self-center sm:w-auto">
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={500}
							rootMargin="0px 0px 125px"
						>
							<hr className="mx-6 my-6 h-12 grow self-center border-t-0 border-l border-black/10 sm:mx-0 sm:h-auto sm:border-t sm:border-l-0 lg:mx-5 lg:my-0 dark:border-white/15" />
						</AnimatedContent>
					</li>

					<li className="flex w-full justify-start sm:justify-end">
						<AnimatedContent
							distance={125}
							config={{ tension: 60, friction: 15 }}
							delay={550}
							rootMargin="0px 0px 125px"
						>
							<Button as="a" href={LINKS.resume} target="_blank" size="lg" variant="outline">
								<IconFileDescription className="size-8" strokeWidth={1.5} />
								<span className="font-medium">{__('buttons.cv')}</span>
							</Button>
						</AnimatedContent>
					</li>
				</ul>
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
