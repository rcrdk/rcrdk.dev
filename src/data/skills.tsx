import {
	IconApi,
	IconBrandAdobeIllustrator,
	IconBrandAdobePhotoshop,
	IconBrandAdobeXd,
	IconBrandAppleFilled,
	IconBrandBitbucket,
	IconBrandChrome,
	IconBrandDocker,
	IconBrandFigma,
	IconBrandGit,
	IconBrandGithub,
	IconBrandNotion,
	IconBrandNpm,
	IconBrandOpenai,
	IconBrandPnpm,
	IconBrandSafari,
	IconBrandTrello,
	IconBrandVercel,
	IconBrandVscode,
	IconCalendarEvent,
	IconShieldChevron,
	IconShieldHalfFilled,
} from '@tabler/icons-react'

import * as Icon from '@/assets/icons'
import { LocalesType } from '@/i18n/routing'

export type SkillCategories = 'front-end' | 'back-end' | 'mobile' | 'tools' | 'misc'

export type SkillObject = {
	title: Record<LocalesType, string>
	categories: SkillCategories[]
	icon?: React.ReactNode
}

export const SKILLS: SkillObject[] = [
	{
		title: { en: 'JavaScript', 'pt-br': 'JavaScript' },
		categories: ['front-end', 'back-end', 'mobile'],
		icon: <Icon.Javascript />,
	},
	{
		title: { en: 'TypeScript', 'pt-br': 'TypeScript' },
		categories: ['front-end', 'back-end', 'mobile'],
		icon: <Icon.Typescript />,
	},
	{ title: { en: 'React Native', 'pt-br': 'React Native' }, categories: ['mobile'], icon: <Icon.React /> },
	{ title: { en: 'React', 'pt-br': 'React' }, categories: ['front-end', 'mobile'], icon: <Icon.React /> },
	{ title: { en: 'Expo', 'pt-br': 'Expo' }, categories: ['mobile'], icon: <Icon.Expo /> },
	{ title: { en: 'Next.js', 'pt-br': 'Next.js' }, categories: ['front-end'], icon: <Icon.Nextjs /> },
	{ title: { en: 'Vue.js', 'pt-br': 'Vue.js' }, categories: ['front-end'], icon: <Icon.Vuejs /> },
	{ title: { en: 'HTML', 'pt-br': 'HTML' }, categories: ['front-end'], icon: <Icon.Html /> },
	{ title: { en: 'CSS', 'pt-br': 'CSS' }, categories: ['front-end'], icon: <Icon.Css /> },
	{ title: { en: 'Redux', 'pt-br': 'Redux' }, categories: ['front-end'], icon: <Icon.Redux /> },
	{ title: { en: 'Zustand', 'pt-br': 'Zustand' }, categories: ['front-end'], icon: <Icon.Zustand /> },
	{ title: { en: 'Context API', 'pt-br': 'Context API' }, categories: ['front-end', 'mobile'], icon: <Icon.React /> },
	{
		title: { en: 'Styled Components', 'pt-br': 'Styled Components' },
		categories: ['front-end', 'mobile'],
		icon: <Icon.StyledComponents />,
	},
	{
		title: { en: 'TailwindCSS', 'pt-br': 'TailwindCSS' },
		categories: ['front-end', 'mobile'],
		icon: <Icon.TailwindCSS />,
	},
	{ title: { en: 'Bootstrap', 'pt-br': 'Bootstrap' }, categories: ['front-end'], icon: <Icon.Bootstrap /> },
	{ title: { en: 'Gluestack UI', 'pt-br': 'Gluestack UI' }, categories: ['mobile'], icon: <Icon.GluestackUI /> },
	{
		title: { en: 'React Native Reanimated', 'pt-br': 'React Native Reanimated' },
		categories: ['mobile'],
		icon: <Icon.ReactNativeReanimated />,
	},
	{
		title: { en: 'React Native Gesture Handler', 'pt-br': 'React Native Gesture Handler' },
		categories: ['mobile'],
		icon: <Icon.ReactNativeGestureHandler />,
	},
	{ title: { en: 'Sass', 'pt-br': 'Sass' }, categories: ['front-end'], icon: <Icon.Sass /> },
	{ title: { en: 'Node.js', 'pt-br': 'Node.js' }, categories: ['back-end'], icon: <Icon.Node /> },
	{ title: { en: 'Fastify', 'pt-br': 'Fastify' }, categories: ['back-end'], icon: <Icon.Fastify /> },
	{ title: { en: 'NestJS', 'pt-br': 'NestJS' }, categories: ['back-end'], icon: <Icon.NestJS /> },
	{ title: { en: 'PHP', 'pt-br': 'PHP' }, categories: ['back-end'], icon: <Icon.PHP /> },
	{ title: { en: 'Laravel', 'pt-br': 'Laravel' }, categories: ['back-end'], icon: <Icon.Laravel /> },
	{
		title: { en: 'API Rest', 'pt-br': 'API Rest' },
		categories: ['front-end', 'back-end', 'mobile'],
		icon: <IconApi className="!fill-none" />,
	},
	{ title: { en: 'React Query', 'pt-br': 'React Query' }, categories: ['front-end'], icon: <Icon.ReactQuery /> },
	{
		title: { en: 'React Hook Form', 'pt-br': 'React Hook Form' },
		categories: ['front-end'],
		icon: <Icon.ReactHookForm />,
	},
	{ title: { en: 'React Router', 'pt-br': 'React Router' }, categories: ['front-end'], icon: <Icon.ReactRouter /> },
	{ title: { en: 'Zod', 'pt-br': 'Zod' }, categories: ['front-end', 'back-end', 'mobile'], icon: <Icon.Zod /> },
	{ title: { en: 'Radix UI', 'pt-br': 'Radix UI' }, categories: ['front-end'], icon: <Icon.RadixUI /> },
	{ title: { en: 'shadcn/ui', 'pt-br': 'shadcn/ui' }, categories: ['front-end'], icon: <Icon.ShadcnUI /> },
	{ title: { en: 'Storybook', 'pt-br': 'Storybook' }, categories: ['front-end'], icon: <Icon.Storybook /> },
	{ title: { en: 'JQuery', 'pt-br': 'JQuery' }, categories: ['front-end'], icon: <Icon.JQuery /> },
	{ title: { en: 'T3 Env', 'pt-br': 'T3 Env' }, categories: ['front-end', 'back-end'], icon: <Icon.T3Env /> },
	{
		title: { en: 'CASL RBAC Authorizations', 'pt-br': 'CASL RBAC Authorizations' },
		categories: ['front-end', 'back-end'],
		icon: <IconShieldHalfFilled />,
	},
	{
		title: { en: 'day.js', 'pt-br': 'day.js' },
		categories: ['front-end', 'back-end'],
		icon: <IconCalendarEvent className="!fill-none" />,
	},
	{ title: { en: 'Lighthouse', 'pt-br': 'Lighthouse' }, categories: ['front-end'], icon: <Icon.Lighthouse /> },
	{ title: { en: 'Stripe API', 'pt-br': 'Stripe API' }, categories: ['back-end'], icon: <Icon.Stripe /> },
	{
		title: { en: 'Auth.js', 'pt-br': 'Auth.js' },
		categories: ['back-end'],
		icon: <IconShieldChevron className="!fill-none" />,
	},
	{ title: { en: 'PostgreSQL', 'pt-br': 'PostgreSQL' }, categories: ['back-end'], icon: <Icon.PostgreSQL /> },
	{ title: { en: 'Firebase', 'pt-br': 'Firebase' }, categories: ['back-end'], icon: <Icon.Firebase /> },
	{ title: { en: 'CloudFlare R2', 'pt-br': 'CloudFlare R2' }, categories: ['back-end'], icon: <Icon.Cloudflare /> },
	{ title: { en: 'Prisma ORM', 'pt-br': 'Prisma ORM' }, categories: ['back-end'], icon: <Icon.PrismaORM /> },
	{ title: { en: 'Vitest', 'pt-br': 'Vitest' }, categories: ['front-end', 'back-end'], icon: <Icon.Vitest /> },
	{
		title: { en: 'React Testing Library', 'pt-br': 'React Testing Library' },
		categories: ['front-end'],
		icon: <Icon.TestingLibrary />,
	},
	{ title: { en: 'Playwright', 'pt-br': 'Playwright' }, categories: ['front-end'], icon: <Icon.Playwright /> },
	{ title: { en: 'MSW', 'pt-br': 'MSW' }, categories: ['front-end', 'back-end'], icon: <Icon.MSW /> },
	{ title: { en: 'macOS', 'pt-br': 'macOS' }, categories: ['tools'], icon: <IconBrandAppleFilled /> },
	{
		title: { en: 'VSCode', 'pt-br': 'VSCode' },
		categories: ['tools'],
		icon: <IconBrandVscode className="!fill-none" />,
	},
	{
		title: { en: 'Google Chrome', 'pt-br': 'Google Chrome' },
		categories: ['tools'],
		icon: <IconBrandChrome className="!fill-none" />,
	},
	{
		title: { en: 'Safari', 'pt-br': 'Safari' },
		categories: ['tools'],
		icon: <IconBrandSafari className="!fill-none" />,
	},
	{
		title: { en: 'ChatGPT', 'pt-br': 'ChatGPT' },
		categories: ['tools'],
		icon: <IconBrandOpenai className="!fill-none" />,
	},
	{ title: { en: 'Figma', 'pt-br': 'Figma' }, categories: ['tools'], icon: <IconBrandFigma className="!fill-none" /> },
	{
		title: { en: 'Adobe Photoshop', 'pt-br': 'Adobe Photoshop' },
		categories: ['tools'],
		icon: <IconBrandAdobePhotoshop className="!fill-none" />,
	},
	{
		title: { en: 'Adobe Illustrator', 'pt-br': 'Adobe Illustrator' },
		categories: ['tools'],
		icon: <IconBrandAdobeIllustrator className="!fill-none" />,
	},
	{
		title: { en: 'Adobe XD', 'pt-br': 'Adobe XD' },
		categories: ['tools'],
		icon: <IconBrandAdobeXd className="!fill-none" />,
	},
	{
		title: { en: 'Docker', 'pt-br': 'Docker' },
		categories: ['tools'],
		icon: <IconBrandDocker className="!fill-none" />,
	},
	{ title: { en: 'Git', 'pt-br': 'Git' }, categories: ['tools'], icon: <IconBrandGit className="!fill-none" /> },
	{
		title: { en: 'GitHub', 'pt-br': 'GitHub' },
		categories: ['tools'],
		icon: <IconBrandGithub className="!fill-none" />,
	},
	{
		title: { en: 'BitBucket', 'pt-br': 'BitBucket' },
		categories: ['tools'],
		icon: <IconBrandBitbucket className="!fill-none" />,
	},
	{
		title: { en: 'Vercel', 'pt-br': 'Vercel' },
		categories: ['tools'],
		icon: <IconBrandVercel className="!fill-none" />,
	},
	{ title: { en: 'NPM', 'pt-br': 'NPM' }, categories: ['tools'], icon: <IconBrandNpm className="!fill-none" /> },
	{ title: { en: 'PNPM', 'pt-br': 'PNPM' }, categories: ['tools'], icon: <IconBrandPnpm className="!fill-none" /> },
	{
		title: { en: 'Notion', 'pt-br': 'Notion' },
		categories: ['tools'],
		icon: <IconBrandNotion className="!fill-none" />,
	},
	{
		title: { en: 'Trello', 'pt-br': 'Trello' },
		categories: ['tools'],
		icon: <IconBrandTrello className="!fill-none" />,
	},
	{ title: { en: 'ESLint', 'pt-br': 'ESLint' }, categories: ['tools'], icon: <Icon.ESLint /> },
	{ title: { en: 'Prettier', 'pt-br': 'Prettier' }, categories: ['tools'], icon: <Icon.Prettier /> },
	{ title: { en: 'EditorConfig', 'pt-br': 'EditorConfig' }, categories: ['tools'], icon: <Icon.EditorConfig /> },
	{ title: { en: 'Portuguese (Native)', 'pt-br': 'Português (Nativo)' }, categories: ['misc'] },
	{ title: { en: 'English (B2 Upper Intermediate)', 'pt-br': 'Inglês (Intermediário B2)' }, categories: ['misc'] },
	{ title: { en: 'Kanban', 'pt-br': 'Kanban' }, categories: ['misc'] },
	{ title: { en: 'UI/UX', 'pt-br': 'UI/UX' }, categories: ['misc'] },
	{ title: { en: 'Resposive design', 'pt-br': 'Design responsivo' }, categories: ['misc'] },
	{ title: { en: 'Mobile first', 'pt-br': 'Mobile first' }, categories: ['misc'] },
	{ title: { en: 'SEO', 'pt-br': 'SEO' }, categories: ['misc'] },
	{ title: { en: 'Accessibility', 'pt-br': 'Acessibilidade' }, categories: ['misc'] },
	{ title: { en: 'SOLID', 'pt-br': 'SOLID' }, categories: ['misc'] },
	{ title: { en: 'Clean Architecture', 'pt-br': 'Clean Architecture' }, categories: ['misc'] },
	{ title: { en: 'Design patterns', 'pt-br': 'Design patterns' }, categories: ['misc'] },
	{ title: { en: 'Detail-oriented person', 'pt-br': 'Orientação a detalhes' }, categories: ['misc'] },
	{ title: { en: 'Creativity', 'pt-br': 'Criatividade' }, categories: ['misc'] },
	{ title: { en: 'Teamwork', 'pt-br': 'Trabalho em equipe' }, categories: ['misc'] },
	{ title: { en: 'Problem solving', 'pt-br': 'Resolução de problemas' }, categories: ['misc'] },
]
