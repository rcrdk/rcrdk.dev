'use client'

import { IconBrandLinkedin, IconFileDescription } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import AnimatedContent from '@/components/animated/animated-content'
import SplitText from '@/components/animated/split-text'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { LINKS } from '@/config/links'
import { cn } from '@/utils/tailwind-cn'

type WorkExperienceEntry = {
	company: string
	url: string
	role: string
	time_range: string
	location: string
	info: string[]
}

type EducationEntry = {
	company: string
	url: string
	title: string
	time_range: string
	location: string
	info: string[]
}

export function Journey() {
	const __ = useTranslations('Journey')

	const workExperiences = __.raw('work_experience.list') as WorkExperienceEntry[]
	const education = __.raw('education.list') as EducationEntry[]

	return (
		<Section>
			<h2 className="layout:mb-8 mb-8 sm:mb-12">
				<SplitText
					text={__('title')}
					delay={25}
					className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white"
				/>
			</h2>

			<AnimatedContent distance={125} rootMargin="0px 0px 125px" config={{ tension: 60, friction: 15 }}>
				<p
					className="xs:text-lg text-md xs:leading-loose mb-0 leading-[1.8] text-pretty"
					dangerouslySetInnerHTML={{ __html: __.raw('intro') }}
				/>
			</AnimatedContent>

			<hr className="my-12 grow self-center border-t border-black/10 dark:border-white/15 sm:dark:border-white/20" />

			<h3 className="mt-12 mb-10">
				<SplitText
					text={__('work_experience.title')}
					delay={40}
					className="font-heading text-2xl tracking-tight dark:text-white"
				/>
			</h3>

			<ul className="flex flex-col gap-8">
				{workExperiences.map((item, index) => (
					<li key={index}>
						<AnimatedContent
							distance={125}
							rootMargin="0px 0px 125px"
							config={{ tension: 60, friction: 15 }}
							className="grid grid-cols-[auto_1fr] md:grid-cols-[10rem_1px_1fr]"
						>
							<div className="order-3 shrink-0 pb-3 pl-6 md:sticky md:top-4 md:order-1 md:row-span-2 md:w-44 md:self-start md:pr-3 md:pb-0 md:pl-0">
								<a
									href={item.url}
									target="_blank"
									className="mr-1 block hover:underline md:mr-0 md:mb-1 md:block md:font-bold md:after:hidden dark:text-white"
								>
									{item.company}
								</a>

								<p className="inline-block text-sm leading-tight text-black/85 after:mx-2 after:not-italic after:content-['|'] max-md:italic md:mr-0 md:block md:after:hidden dark:text-white/70 dark:md:text-white/55">
									{item.time_range}
								</p>

								<p className="inline-block text-sm leading-tight text-black/85 max-md:italic md:mr-0 md:block dark:text-white/70 dark:md:text-white/55">
									{item.location}
								</p>
							</div>

							<span className="relative order-1 row-span-3 block w-px shrink-0 md:order-2 md:row-span-2">
								<span
									className={cn(
										'absolute top-0 -bottom-8 left-0 block w-px bg-black/10 dark:bg-white/15',
										index === 0 ? 'top-2.5' : 'top-0',
										index === workExperiences.length - 1 ? 'bottom-0' : '-bottom-8',
									)}
								/>
								<span className="bg-accent-blue absolute top-2.5 -left-1 block size-2 rounded-full" />
							</span>

							<h4 className="text-md order-2 pl-6 font-bold text-pretty md:order-3 md:mb-2 md:text-lg md:font-semibold dark:text-white">
								{item.role}
							</h4>

							<div className="order-3 grow pl-6">
								<ul className="dark:text-content-dark text-content-light list-disc pl-4 text-sm text-pretty sm:text-base">
									{item.info.map((detail, n) => (
										<li key={n}>{detail}</li>
									))}
								</ul>
							</div>
						</AnimatedContent>
					</li>
				))}
			</ul>

			<hr className="my-12 grow self-center border-t border-black/10 dark:border-white/15 sm:dark:border-white/20" />

			<h3 className="mt-12 mb-10">
				<SplitText
					text={__('education.title')}
					delay={50}
					className="font-heading text-2xl tracking-tight dark:text-white"
				/>
			</h3>

			<ul className="flex flex-col gap-8">
				{education.map((item, index) => (
					<li key={index}>
						<AnimatedContent
							distance={125}
							rootMargin="0px 0px 125px"
							config={{ tension: 60, friction: 15 }}
							className="grid grid-cols-[auto_1fr] md:grid-cols-[10rem_1px_1fr]"
						>
							<div className="order-3 shrink-0 pb-3 pl-6 md:sticky md:top-4 md:order-1 md:row-span-2 md:w-44 md:self-start md:pr-3 md:pb-0 md:pl-0">
								<a
									href={item.url}
									target="_blank"
									className="mr-1 block hover:underline md:mr-0 md:mb-1 md:block md:font-bold md:after:hidden dark:text-white"
								>
									{item.company}
								</a>

								<p className="inline-block text-sm leading-tight text-black/85 after:mx-2 after:not-italic after:content-['|'] max-md:italic md:mr-0 md:block md:after:hidden dark:text-white/70 dark:md:text-white/55">
									{item.time_range}
								</p>

								<p className="inline-block text-sm leading-tight text-black/85 max-md:italic md:mr-0 md:block dark:text-white/70 dark:md:text-white/55">
									{item.location}
								</p>
							</div>

							<span className="relative order-1 row-span-3 block w-px shrink-0 md:order-2 md:row-span-2">
								<span
									className={cn(
										'absolute top-0 -bottom-8 left-0 block w-px bg-black/10 dark:bg-white/15',
										index === 0 ? 'top-2.5' : 'top-0',
										index === education.length - 1 ? 'bottom-0' : '-bottom-8',
									)}
								/>
								<span className="bg-accent-blue absolute top-2.5 -left-1 block size-2 rounded-full" />
							</span>

							<h4 className="text-md order-2 mb-[2px] pl-6 font-bold text-pretty md:order-3 md:mb-2 md:text-lg md:font-semibold dark:text-white">
								{item.title}
							</h4>

							<div className="order-3 grow pl-6">
								{/* <p className="dark:text-content-dark text-content-light text-sm sm:text-base">{item.description}</p> */}
								<ul className="dark:text-content-dark text-content-light list-disc pl-4 text-sm text-pretty sm:text-base">
									{item.info.map((detail, n) => (
										<li key={n}>{detail}</li>
									))}
								</ul>
							</div>
						</AnimatedContent>
					</li>
				))}
			</ul>

			<AnimatedContent
				distance={125}
				rootMargin="0px 0px 125px"
				config={{ tension: 60, friction: 15 }}
				className="mt-12"
			>
				<div className="flex items-center gap-6 rounded-2xl bg-black/5 p-5 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 dark:bg-white/10">
					<p className="xs:text-start text-content-light/75 dark:text-content-dark/75 text-center text-[15px] text-balance">
						{__('box.text')}
					</p>

					<div className="xs:w-auto flex w-full gap-2">
						<Button
							as="a"
							href={LINKS.linkedIn}
							target="_blank"
							size="sm"
							variant="outline"
							className="xs:grow-0 grow bg-transparent dark:bg-transparent"
						>
							<IconBrandLinkedin />
							<span className="font-semibold">{__('box.button.linkedin')}</span>
						</Button>

						<Button
							as="a"
							href={LINKS.resume}
							target="_blank"
							size="sm"
							variant="outline"
							className="xs:grow-0 grow bg-transparent dark:bg-transparent"
						>
							<IconFileDescription />
							<span className="font-semibold">{__('box.button.cv')}</span>
						</Button>
					</div>
				</div>
			</AnimatedContent>
		</Section>
	)
}
