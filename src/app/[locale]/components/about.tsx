'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { IconCoffee } from '@tabler/icons-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import avatarPicture from '@/assets/avatar.jpg'
import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

export function About() {
	const [showContents, setShowContents] = useState(false)

	const __ = useTranslations('About')
	const contents = __.raw('contents') as string[]
	const list = __.raw('list') as Record<string, string>[]

	return (
		<Section>
			<div className="xs:-mt-18 -md-14 flex flex-col-reverse items-center sm:-mt-20 lg:mt-0 lg:flex-row lg:items-end">
				<div>
					<h2 className="mb-8">
						<SplitText
							text={__('title')}
							delay={50}
							className="font-heading block text-6xl font-black tracking-tight md:max-w-full dark:text-white"
						/>
					</h2>

					<AnimatedContent
						distance={125}
						rootMargin="0px 0px 125px"
						config={{ tension: 60, friction: 15 }}
					>
						<p className="xs:text-lg text-md mb-0 leading-loose text-pretty">
							{contents.at(0)}
						</p>
					</AnimatedContent>
				</div>

				<div className="layout:-mr-44 layout:ml-14 xs:mb-9 layout:size-96 mb-7 size-96 shrink-0 sm:mb-10 lg:-mr-20 lg:mb-0 lg:ml-8">
					<AnimatedContent
						scale={0.4}
						distance={125}
						rootMargin="0px 0px 125px"
						config={{ tension: 60, friction: 15 }}
						delay={200}
					>
						<Image
							src={avatarPicture}
							width={600}
							height={600}
							alt=""
							className="animate-avatar shrink-0 [shape-outside:circle(50%)]"
						/>
					</AnimatedContent>
				</div>
			</div>

			<Collapsible.Root
				className="xs:min-h-12 relative mt-6 mb-12 min-h-11"
				open={showContents}
				onOpenChange={() => setShowContents((prev) => !prev)}
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
								<p className="xs:text-lg text-md leading-loose text-pretty">
									{item}
								</p>
							</AnimatedContent>
						))}
					</div>
				</Collapsible.Content>

				<AnimatedContent
					distance={125}
					rootMargin="0px 0px 125px"
					config={{ tension: 60, friction: 15 }}
					className="absolute bottom-0 left-0"
				>
					<Collapsible.Trigger asChild>
						<Button variant="solid" hidden={showContents}>
							<IconCoffee />
							<span className="font-medium">{__('expand')}</span>
						</Button>
					</Collapsible.Trigger>
				</AnimatedContent>
			</Collapsible.Root>

			{contents.slice(1).map((item, index) => (
				<p className="sr-only" key={index}>
					{item}
				</p>
			))}

			<AnimatedContent
				distance={125}
				rootMargin="0px 0px 125px"
				config={{ tension: 60, friction: 15 }}
			>
				<h3 className="font-heading mb-4 text-2xl font-black tracking-tight dark:text-white">
					{__('subtitle')}
				</h3>
			</AnimatedContent>

			<AnimatedContent
				distance={125}
				rootMargin="0px 0px 125px"
				config={{ tension: 60, friction: 15 }}
			>
				{list.map((item) => (
					<p
						className="text-content-light/65 dark:text-content-dark/85 pb-2"
						key={item.title}
					>
						<strong className="text-content-light font-semibold dark:text-white">
							{item.title}:
						</strong>{' '}
						{item.text}.
					</p>
				))}
			</AnimatedContent>
		</Section>
	)
}
