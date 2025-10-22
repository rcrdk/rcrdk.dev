'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconCoffee } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import avatarPicture from '@/assets/avatar.jpg'
import AnimatedContent from '@/components/animated/animated-content'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { FULL_DATES } from '@/config/dates'
import { useGame } from '@/hooks/use-game'
import { yearsFromThen } from '@/lib/dayjs'

export function About() {
	const [showContents, setShowContents] = useState(false)

	const __ = useTranslations('About')
	const contents = __.raw('contents') as string[]

	const { onCompleteTask } = useGame()

	const handleShowContents = useCallback(() => {
		setShowContents((prev) => !prev)
		onCompleteTask('about-me')
	}, [onCompleteTask])

	return (
		<Section classNameCenter="max-xs:py-9">
			<div className="-md-14 relative flex flex-col-reverse items-center sm:-mt-20 sm:items-end lg:mt-0 lg:flex-row lg:items-center">
				<div>
					<h2 className="about-title layout:mb-8 xs:pr-0 absolute top-0 right-0 left-0 flex aspect-[16/15] items-end justify-start sm:aspect-auto sm:h-[26rem] lg:static lg:mb-12 lg:block lg:h-auto">
						<AnimatedContent distance={125} rootMargin="0px 0px 125px" config={{ tension: 60, friction: 15 }}>
							<span className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl md:max-w-full lg:text-6xl dark:text-white">
								{__('title')}
							</span>
						</AnimatedContent>
					</h2>

					<AnimatedContent distance={125} rootMargin="0px 0px 125px" config={{ tension: 60, friction: 15 }}>
						<p
							className="xs:text-lg text-md xs:leading-loose mb-0 leading-[1.8] text-pretty"
							dangerouslySetInnerHTML={{
								__html: contents.at(0)?.replace('{age}', yearsFromThen(FULL_DATES.birthday).toString()) ?? '',
							}}
						/>
					</AnimatedContent>
				</div>

				<div className="layout:-mr-44 layout:ml-14 xs:mb-9 layout:size-96 animate-avatar mb-7 shrink-0 overflow-hidden will-change-[transform] sm:mb-10 sm:size-[30rem] lg:-mr-20 lg:mb-0 lg:ml-8 lg:size-96">
					<AnimatedContent
						scale={2}
						distance={50}
						rootMargin="0px 0px 50px"
						config={{ tension: 60, friction: 15 }}
						delay={200}
					>
						<Image
							src={avatarPicture}
							width={800}
							height={800}
							quality={100}
							alt="Ricardo Augusto Kowalski - Front-end Developer"
							className="shrink-0"
						/>

						<span className="about-title layout:mb-8 xs:pr-0 absolute top-0 right-0 flex aspect-[16/15] w-full max-w-[768px] translate-3d items-end justify-start sm:aspect-auto sm:h-[26rem] sm:w-[calc(100vw-(var(--spacing)*32))] md:w-[calc(100vw-(var(--spacing)*40))] lg:hidden">
							<span className="font-heading block text-5xl font-black tracking-tight text-balance text-white sm:text-7xl md:max-w-full lg:text-6xl">
								{__('title')}
							</span>
						</span>
					</AnimatedContent>
				</div>
			</div>

			<Collapsible.Root
				className="xs:min-h-14 relative mt-6 min-h-12 lg:min-h-12"
				open={showContents}
				onOpenChange={handleShowContents}
			>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden">
					<div className="flex flex-col gap-6">
						{contents.slice(1).map((item, index) => (
							<AnimatedContent
								distance={125}
								rootMargin="0px 0px 125px"
								config={{ tension: 60, friction: 15 }}
								key={index}
							>
								<p
									className="xs:text-lg text-md xs:leading-loose leading-[1.8] text-pretty"
									dangerouslySetInnerHTML={{ __html: item }}
								/>
							</AnimatedContent>
						))}
					</div>
				</Collapsible.Content>

				<AnimatedContent
					distance={125}
					rootMargin="0px 0px 125px"
					config={{ tension: 60, friction: 15 }}
					className="absolute right-0 bottom-0 left-0"
				>
					<Collapsible.Trigger asChild>
						<Button
							variant="solid"
							className="max-xs:px-0 max-xs:w-full xs:h-14 xs:gap-5 xs:px-6 h-12 gap-4 px-6 lg:h-12 lg:gap-3 lg:px-5"
							hidden={showContents}
						>
							<IconCoffee aria-hidden />
							<span className="font-medium">{__('expand')}</span>
						</Button>
					</Collapsible.Trigger>
				</AnimatedContent>
			</Collapsible.Root>

			{contents.slice(1).map((item, index) => (
				<p className="sr-only" key={index} dangerouslySetInnerHTML={{ __html: item }} />
			))}
		</Section>
	)
}
