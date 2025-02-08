'use client'

import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import AnimatedContent from '@/components/animated/AnimatedContent'
import SplitText from '@/components/animated/SplitText'
import { Button } from '@/components/ui/button'

export function Content() {
	const [canDelayAnimations, setCanDelayAnimations] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const __ = useTranslations('Home')

	const aboutMeParagraphs = __.raw('text') as string[]

	const contactButtons = [
		{
			id: 'linkedin',
			link: 'https://www.linkedin.com/in/rcrdk/',
			label: __('buttons.linkedin'),
			Icon: IconBrandLinkedin,
			external: true,
		},
		{
			id: 'email',
			link: 'mailto:ricardoakowalski@gmail.com',
			label: __('buttons.email'),
			Icon: IconMail,
			external: false,
		},
		{
			id: 'discord',
			link: 'https://discordapp.com/users/810953409850114098',
			label: __('buttons.discord'),
			Icon: IconBrandDiscord,
			external: true,
		},
		{
			id: 'github',
			link: 'https://github.com/rcrdk',
			label: __('buttons.github'),
			Icon: IconBrandGithub,
			external: true,
		},
		{
			id: 'behance',
			link: 'https://behance.net/rcrdk',
			label: __('buttons.behance'),
			Icon: IconBrandBehance,
			external: true,
		},
		// {
		// 	id: 'resume',
		// 	link: '',
		// 	label: __('buttons.resume'),
		// 	Icon: IconFileDescription,
		// 	external: true,
		// },
	]

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setCanDelayAnimations(true)
					observer.unobserve(element)
				}
			},
			{ threshold: 1 },
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return (
		<div ref={ref}>
			<h1>
				<SplitText
					text={__('title')}
					delay={50}
					className="font-heading xs:text-7xl xs:leading-[0.85] block max-w-1/2 text-[20vw] leading-[16vw] font-black tracking-tight text-black sm:text-8xl md:max-w-full md:text-5xl dark:text-white"
				/>
			</h1>

			<div className="xs:mt-12 mt-10 flex flex-col gap-4 sm:mt-16 md:mt-8">
				{aboutMeParagraphs.map((text, index) => (
					<AnimatedContent
						key={index}
						distance={125}
						config={{ tension: 60, friction: 15 }}
						delay={canDelayAnimations ? index * 100 : 0}
						rootMargin="0px 0px 125px"
					>
						<p
							className="[&_a]:focus-visible:text-accent-blue xs:text-lg text-md leading-loose text-pretty dark:[&_a]:text-white dark:[&_strong]:text-white"
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					</AnimatedContent>
				))}
			</div>

			<AnimatedContent
				distance={125}
				delay={canDelayAnimations ? 300 : 0}
				config={{ tension: 60, friction: 15 }}
				rootMargin="0px 0px 125px"
			>
				<ul className="xs:gap-3 mt-8 flex gap-2">
					{contactButtons.map(({ Icon, ...button }) => (
						<li key={button.id}>
							<Button
								as="a"
								href={button.link}
								target={button.external ? '_blank' : '_self'}
								size="lg"
								variant="primary-discret"
								icon
								aria-label={button.label}
							>
								<Icon className="size-8" strokeWidth={1.5} />
							</Button>
						</li>
					))}
				</ul>
			</AnimatedContent>
		</div>
	)
}
