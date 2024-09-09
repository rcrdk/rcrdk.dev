import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
} from '@tabler/icons-react'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import favicon from '@/assets/favicon.png'
import sharingImage from '@/assets/open-graph.jpg'
import { Button } from '@/components/button'
import Header from '@/components/header'
import { Heading } from '@/components/heading'
import { LayoutContainer } from '@/components/layout'
import { SrOnly, Text } from '@/components/text'
import Tooltip from '@/components/tooltip'

import { Buttons, HomeContainer } from './styles'

export default function Home() {
	const __ = useTranslations('Home')

	const SEO = {
		title: __('seo.title'),
		description: __('seo.description'),
		url: process.env.NEXT_PUBLIC_URL,
		image: process.env.NEXT_PUBLIC_URL + sharingImage.src,
		favicon: process.env.NEXT_PUBLIC_URL + favicon.src,
	}

	const aboutMeParagraphs: string[] = __.raw('text')

	const contactButtons = useMemo(
		() => [
			{
				id: 'linkedin',
				link: 'https://www.linkedin.com/in/rcrdk/',
				label: __('buttons.linkedin'),
				icon: <IconBrandLinkedin />,
				external: true,
			},
			{
				id: 'email',
				link: 'mailto:ricardoakowalski@gmail.com',
				label: __('buttons.email'),
				icon: <IconMail />,
				external: false,
			},
			{
				id: 'discord',
				link: 'https://discordapp.com/users/810953409850114098',
				label: __('buttons.discord'),
				icon: <IconBrandDiscord />,
				external: true,
			},
			{
				id: 'github',
				link: 'https://github.com/rcrdk',
				label: __('buttons.github'),
				icon: <IconBrandGithub />,
				external: true,
			},
			{
				id: 'behance',
				link: 'https://behance.net/rcrdk',
				label: __('buttons.behance'),
				icon: <IconBrandBehance />,
				external: true,
			},
			// {
			// 	id: 'resume',
			// 	link: '',
			// 	label: __('buttons.resume'),
			// 	icon: <IconFileDescription />,
			// 	external: true,
			// },
		],
		[__],
	)

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{SEO.title}</title>
				<meta name="description" content={SEO.description} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Ricardo Augusto Kowalski" />
				<meta property="og:locale" content="pt_BR" />
				<meta property="og:title" content={SEO.title} />
				<meta property="og:description" content={SEO.description} />
				<meta property="og:image" content={SEO.image} />
				<meta property="og:url" content={SEO.url} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={SEO.title} />
				<meta name="twitter:description" content={SEO.description} />
				<meta name="twitter:image" content={SEO.image} />
				<meta property="og:image:width" content="2400" />
				<meta property="og:image:height" content="1260" />
				<link rel="icon" href={SEO.favicon} type="image/png" sizes="192x192" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#00a5bc"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#000000"
				/>
			</Head>

			<LayoutContainer>
				<Header />

				<HomeContainer as="main">
					<Heading>{__('title')}</Heading>

					{aboutMeParagraphs.map((text, index) => (
						<Text
							size="lead"
							key={index}
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					))}

					<Buttons>
						{contactButtons.map((button) => (
							<Tooltip content={button.label} key={button.id}>
								<Button
									mode="outline"
									size="lead"
									as="a"
									href={button.link}
									target={button.external ? '_blank' : '_self'}
									rel={button.external ? 'noopener noreferrer' : undefined}
								>
									{button.icon}
									<SrOnly>{button.label}</SrOnly>
								</Button>
							</Tooltip>
						))}
					</Buttons>
				</HomeContainer>
			</LayoutContainer>
		</>
	)
}
