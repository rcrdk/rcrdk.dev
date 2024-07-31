import {
	IconBrandBehance,
	IconBrandGithub,
	IconBrandLinkedin,
	IconFileDescription,
	IconMail,
} from '@tabler/icons-react'
import Head from 'next/head'

import favicon from '@/assets/favicon.png'
import sharingImage from '@/assets/open-graph.jpg'
import { Button } from '@/components/button'
import Header from '@/components/header'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import Tooltip from '@/components/tooltip'

import { Buttons, HomeContainer } from './styles'

export default function Home() {
	const SEO = {
		title: 'Ricardo Augusto Kowalski | Desenvolvedor Front-End',
		description:
			'Sou desenvolvedor front-end com mais de 11 anos de experiência, trabalhando atualmente com a stack: Typescript, React e Next.js.',
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
				<meta property="og:image" content={sharingImage.src} />
				<meta property="og:url" content="/" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={SEO.title} />
				<meta name="twitter:description" content={SEO.description} />
				<meta name="twitter:image" content={sharingImage.src} />
				<link rel="icon" href={favicon.src} type="image/png" sizes="128x128" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#00a5bc"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#0277a9"
				/>
			</Head>

			<Header />

			<HomeContainer as="main">
				<Heading>Ricardo Augusto Kowalski</Heading>
				<Text size="lead" balance>
					Sou <strong>desenvolvedor front-end</strong> há mais de 11 anos,
					trabalhei a maior parte deste tempo movido a muito café e motivação no
					desenvolvimento de{' '}
					<strong>websites, e-commerces e sistemas web</strong>. Tenho 28 anos e
					sou bacharel em <strong>Publicidade e Propaganda</strong> desde 2017.
				</Text>
				<Text size="lead" balance>
					Neste período colaborei em projetos usando o ecossistema{' '}
					<strong>PHP/Laravel</strong> escrevendo muito <strong>CSS</strong> com
					uso do pré-processador LESS, e também muito{' '}
					<strong>JavaScript</strong> puro ou com jQuery{' '}
					<s>(já faz muito, muito tempo)</s>. Tudo isso, claro, buscando de
					desenvolver projetos com <strong>boas práticas</strong> de código, que
					tivessem boa <strong>performance</strong> e que trouxessem{' '}
					<strong>resultados positivos</strong> para os clientes.
				</Text>
				<Text size="lead" balance>
					Com toda essa experiência acabei me tornando um adepto do{' '}
					<strong>Pixel Perfect</strong> podendo desenvolver interfaces de alta
					qualidade. Desenvolvi alguns projetos como{' '}
					<strong>desenvolvedor full-stack</strong> usando o ecossistema
					Laravel. Outras habilidades que se destacam são: edição de imagens e
					design de interfaces.
				</Text>

				<Text size="lead" balance>
					Atualmente meu foco de estudo e de trabalho vem sendo a stack{' '}
					<strong>Typescript, React e Next.js</strong> das quais busco
					oportunidades, e claro, venho me atualizando e alimentando minha
					vontade de aprender cada vez mais.
				</Text>

				<Text size="lead" balance>
					Esta página ainda está em <strong>desenvolvimento</strong>, mas estou
					disponível para novas oportunidades ou quem sabe um papo, fique a
					vontade para entrar em contato por{' '}
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
						</Button>
					</Tooltip>

					<Tooltip content="Veja minha atividade e projetos no GitHub">
						<Button
							mode="outline"
							size="lead"
							as="a"
							href="http://"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconBrandGithub />
						</Button>
					</Tooltip>

					<Tooltip content="Veja alguns projetos visuais no Behance">
						<Button
							mode="outline"
							size="lead"
							as="a"
							href="http://"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconBrandBehance />
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
		</>
	)
}
