/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LocalesType } from '@/i18n/routing'

const ROLES_KEYS = ['frontEnd', 'backEnd', 'productDesigner', 'designer', 'fullStack', 'developmentAgency', 'communicationAgency', 'designStudio', 'school', 'designByClient', 'company'] as const

export type ROLES_KEYS_TYPE = (typeof ROLES_KEYS)[number]

export const ROLES: Record<ROLES_KEYS_TYPE, Record<LocalesType, string>> = {
	frontEnd: { 'pt-br': 'Desenvolvedor Front-End', en: 'Front-End Developer' },
	backEnd: { 'pt-br': 'Desenvolvedor Back-End', en: 'Back-End Developer' },
	productDesigner: { 'pt-br': 'Designer de Produto', en: 'Product Designer' },
	designer: { 'pt-br': 'Designer', en: 'Designer' },
	designByClient: { 'pt-br': 'Clientes e design do projeto', en: 'Client and project design' },
	fullStack: { 'pt-br': 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' },
	developmentAgency: { 'pt-br': 'Agência de desenvolvimento', en: 'Development agency' },
	communicationAgency: { 'pt-br': 'Agência de comunicação', en: 'Communication agency' },
	designStudio: { 'pt-br': 'Estúdio de Design', en: 'Design Studio' },
	school: { 'pt-br': 'Instituição de Ensino', en: 'School' },
	company: { 'pt-br': 'Empresa', en: 'Company' },
} as const

export const ATTRIBUTIONS = {
	rcrdk: {
		name: 'Ricardo A. Kowalski',
		avatarUrl: 'https://github.com/rcrdk.png',
		url: 'https://github.com/rcrdk',
	},
	cleitokarloh: {
		name: 'Cleito Karloh',
		avatarUrl: 'https://github.com/cleitokarloh.png',
		url: 'https://github.com/cleitokarloh',
	},
	enzoDamascena: {
		name: 'Enzo Damascena',
		avatarUrl: 'https://github.com/enzodamascena.png',
		url: 'https://github.com/enzodamascena',
	},
	marlonberaldo: {
		name: 'Marlon Beraldo',
		avatarUrl: 'https://github.com/marlonberaldo.png',
		url: 'https://github.com/marlonberaldo',
	},
	bruch0: {
		name: 'Lucas Bruch',
		avatarUrl: 'https://github.com/bruch0.png',
		url: 'https://github.com/bruch0',
	},
	leonardoRibeiro: {
		name: 'Leonardo Ribeiro',
		avatarUrl: '/users/leonardo-ribeiro.webp',
		url: 'https://www.linkedin.com/in/leonardoribeiropereira',
	},
	mySide: {
		name: 'MySide',
		avatarUrl: '/companies/myside.jpeg',
		url: 'https://myside.com.br',
	},
	meuRosinha: {
		name: 'Meu Rosinha',
		avatarUrl: '/companies/meu-rosinha.jpeg',
		url: 'https://meurosinha.com.br',
	},
	souDigital: {
		name: 'Sou Digital',
		avatarUrl: '/companies/sou-digital.jpeg',
		url: 'https://sou.digital',
	},
	ceuDesign: {
		name: 'Céu Design',
		avatarUrl: '/companies/ceu-design.jpg',
		url: 'https://ceu.design/',
	},
	firmorama: {
		name: 'Firmorama',
		avatarUrl: '/companies/firmorama.png',
		url: 'https://firmorama.com/',
	},
	rocketseat: {
		name: 'Rocketseat',
		avatarUrl: '/companies/rocketseat.jpeg',
		url: 'https://rocketseat.com.br/',
	},
	selfDesignStudio: {
		name: 'SELF Design Studio',
		avatarUrl: '/companies/self-design-studio.png',
		url: 'https://self.art.br/',
	},
	molde: {
		name: 'Molde',
		avatarUrl: '/companies/molde.jpg',
		url: 'https://www.molde.sc/',
	},
	rotoFermax: {
		name: 'Roto Fermax',
		avatarUrl: '/companies/roto-fermax.jpg',
		url: 'https://www.rotofermax.com.br/',
	},
	bca: {
		name: 'B+CA',
		avatarUrl: '/companies/bca.jpeg',
		url: 'https://www.bmaisca.com.br',
	},
	sevenComunicacao: {
		name: 'Seven Comunicação',
		avatarUrl: '/companies/seven-comunicacao.jpeg',
		url: 'https://www.agenciaseven.com.br',
	},
	ultraComunicacao: {
		name: 'Ultra Comunicação',
		avatarUrl: '/companies/ultra-comunicacao.jpeg',
		url: 'https://www.linkedin.com/company/agenciaultra/',
	},
	geoVendas: {
		name: 'GEOvendas',
		avatarUrl: '/companies/geo-vendas.jpeg',
		url: 'https://geovendas.com/',
	},
}

export type ATTRIBUTIONS_TYPE = keyof typeof ATTRIBUTIONS
