import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Header } from '@/components/common/header'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { trackServerEvent } from '@/lib/mixpanel'

export async function generateMetadata(): Promise<Metadata> {
	const __ = await getTranslations('Home')

	return {
		title: __('seo.title'),
		description: __('seo.description'),
		keywords: __.raw('seo.keywords'),
		alternates: {
			canonical: '/pt-br',
			languages: {
				pt: '/pt-br',
				en: '/en',
			},
		},
	}
}

type Props = {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params

	await trackServerEvent('page_view', {
		page: 'home',
		locale,
	})

	const __ = await getTranslations('Home')

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

	return (
		<div className="flex min-h-svh flex-col items-center">
			<Header />

			<Container
				size="center"
				sideSpacing="lg"
				className="xs:py-16 my-auto py-10 sm:py-20"
			>
				<h1 className="font-heading xs:text-7xl xs:mb-12 mb-10 max-w-1/2 text-6xl font-black tracking-tight text-black sm:mb-16 sm:text-8xl md:mb-8 md:max-w-full md:text-5xl dark:text-white">
					{__('title')}
				</h1>

				<div className="flex flex-col gap-4">
					{aboutMeParagraphs.map((text, index) => (
						<p
							className="[&_a]:focus-visible:text-accent-blue xs:text-lg text-base leading-loose text-pretty dark:[&_a]:text-white dark:[&_strong]:text-white"
							key={index}
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					))}
				</div>

				<div className="xs:gap-3 mt-8 flex gap-2">
					{contactButtons.map(({ Icon, ...button }) => (
						<Button
							as="a"
							href={button.link}
							target={button.external ? '_blank' : '_self'}
							size="lg"
							variant="outline"
							icon
							aria-label={button.label}
							key={button.id}
						>
							<Icon className="size-8" />
						</Button>
					))}
				</div>
			</Container>
		</div>
	)
}
