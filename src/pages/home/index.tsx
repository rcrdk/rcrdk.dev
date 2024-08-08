import {
	IconBrandBehance,
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
} from '@tabler/icons-react'
import Head from 'next/head'

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
	const SEO = {
		title: 'Ricardo Augusto Kowalski | Desenvolvedor Front-End',
		description:
			'Sou desenvolvedor front-end com mais de 11 anos de experiência, trabalhando atualmente com a stack: Typescript, React e Next.js.',
		url: process.env.NEXT_PUBLIC_URL,
		image: process.env.NEXT_PUBLIC_URL + sharingImage.src,
		favicon: process.env.NEXT_PUBLIC_URL + favicon.src,
	}

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{SEO.title}</title>
				<meta name="description" content={SEO.description} />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="pt_BR" />
				<meta property="og:title" content={SEO.title} />
				<meta property="og:description" content={SEO.description} />
				<meta property="og:image" content={SEO.image} />
				<meta property="og:url" content={SEO.url} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={SEO.title} />
				<meta name="twitter:description" content={SEO.description} />
				<meta name="twitter:image" content={SEO.image} />
				<link rel="icon" href={SEO.favicon} type="image/png" sizes="128x128" />
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
					<Heading>Ricardo Augusto Kowalski</Heading>
					<Text size="lead">
						Sou <strong>desenvolvedor front-end</strong> há mais de 11 anos,
						trabalhei a maior parte deste tempo movido a muito café e playlists
						no desenvolvimento de{' '}
						<strong>websites, e-commerces e sistemas web</strong>. Tenho 28 anos
						e sou bacharel em <strong>Publicidade e Propaganda</strong>.
					</Text>

					{/* <Text size="lead">
						Neste período colaborei em projetos usando o ecossistema{' '}
						<strong>PHP/Laravel</strong> escrevendo muito <strong>CSS</strong> com
						uso do pré-processador LESS, e também muito{' '}
						<strong>JavaScript</strong> puro ou com jQuery{' '}
						<s>(já faz muito, muito tempo)</s>. Tudo isso, claro, buscando de
						desenvolver projetos com <strong>boas práticas</strong> de código, que
						tivessem boa <strong>performance</strong> e que trouxessem{' '}
						<strong>resultados positivos</strong> para os clientes.
					</Text>

					<Text size="lead">
						Com toda essa experiência acabei me tornando um adepto do{' '}
						<strong>Pixel Perfect</strong> podendo desenvolver interfaces de alta
						qualidade. Desenvolvi alguns projetos como{' '}
						<strong>desenvolvedor full-stack</strong> usando o ecossistema
						Laravel. Outras habilidades que se destacam são: edição de imagens e
						design de interfaces.
					</Text> */}

					<Text size="lead">
						Atualmente meu foco de estudo e de trabalho vem sendo a stack{' '}
						<strong>Typescript, React e Next.js</strong> das quais busco
						oportunidades, e claro, venho me atualizando e alimentando minha
						vontade de aprender cada vez mais.
					</Text>

					<Text size="lead">
						Esta página ainda está em <strong>desenvolvimento</strong>, mas
						estou disponível para novas oportunidades ou quem sabe um papo,
						fique a vontade para entrar em contato em{' '}
						<a href="mailto:ricardoakowalski@gmail.com">
							ricardoakowalski@gmail.com
						</a>{' '}
						ou se conectar através de alguma rede abaixo:
					</Text>

					<Buttons>
						<Tooltip content="Conecte-se comigo no LinkedIn">
							<Button
								mode="outline"
								size="lead"
								as="a"
								href="https://www.linkedin.com/in/rcrdk/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconBrandLinkedin />
								<SrOnly>Conecte-se comigo no LinkedIn</SrOnly>
							</Button>
						</Tooltip>

						<Tooltip content="Entre em contato comigo por e-mail">
							<Button
								mode="outline"
								size="lead"
								as="a"
								href="mailto:ricardoakowalski@gmail.com"
							>
								<IconMail />
								<SrOnly>Entre em contato comigo por e-mail</SrOnly>
							</Button>
						</Tooltip>

						<Tooltip content="Entre em contato comigo no Discord">
							<Button
								mode="outline"
								size="lead"
								as="a"
								href="https://discordapp.com/users/810953409850114098"
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconBrandDiscord />
								<SrOnly>Entre em contato comigo no Discord</SrOnly>
							</Button>
						</Tooltip>

						<Tooltip content="Veja minha atividade e projetos no GitHub">
							<Button
								mode="outline"
								size="lead"
								as="a"
								href="https://github.com/rcrdk"
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconBrandGithub />
								<SrOnly>Veja minha atividade e projetos no GitHub</SrOnly>
							</Button>
						</Tooltip>

						<Tooltip content="Veja alguns projetos visuais no Behance">
							<Button
								mode="outline"
								size="lead"
								as="a"
								href="https://behance.net/rcrdk"
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconBrandBehance />
								<SrOnly>Veja alguns projetos visuais no Behance</SrOnly>
							</Button>
						</Tooltip>

						{/* <Button
						mode="outline"
						size="lead"
						as="a"
						href="http://"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconFileDescription />
						<span>Veja meu CV atualizado</span>
					</Button> */}
					</Buttons>
				</HomeContainer>
			</LayoutContainer>
		</>
	)
}
