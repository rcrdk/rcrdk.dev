import type { HistoryProject } from '@/types/history'

// TODO: Add descriptions and gallery
export const MYSIDE_PROJECTS: HistoryProject[] = [
	{
		id: 'heropwa',
		companyId: 'myside',
		categories: ['Web App', 'PWA'],
		image: '/projects/hero-mobile.jpg',
		links: { behance: null, github: null, website: 'https://myside.com.br' },
		stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Radix UI', 'Jest', 'React Testing Library', 'APIs Rest', 'Figma', 'Browser APIs', 'React Query', 'React Hook Form', 'Zod', 'Framer Motion'],
		year: 2025,
		'pt-br': { title: 'Hero Mobile', description: '' },
		en: { title: 'Hero Mobile', description: '' },
		gallery: [],
		attributions: [
			{ id: 'rcrdk', roles: ['frontEnd'] },
			{ id: 'marlonberaldo', roles: ['frontEnd'] },
			{ id: 'bruch0', roles: ['frontEnd'] },
			{ id: 'leonardoRibeiro', roles: ['productDesigner'] },
			{ id: 'mySide', roles: ['company'] },
		],
		handler: { backgroundColor: '#fff', opacity: 1 },
	},
	{
		id: 'herodesktop',
		companyId: 'myside',
		categories: ['Web App'],
		image: '/projects/hero-desktop.jpg',
		links: { behance: null, github: null, website: 'https://myside.com.br' },
		stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Radix UI', 'Jest', 'React Testing Library', 'APIs Rest', 'Figma', 'Google Maps API', 'Browser APIs', 'React Query', 'React Hook Form', 'Zod', 'Framer Motion'],
		year: 2025,
		'pt-br': { title: 'Hero Desktop', description: '' },
		en: { title: 'Hero Desktop', description: '' },
		gallery: [],
		attributions: [
			{ id: 'rcrdk', roles: ['frontEnd'] },
			{ id: 'marlonberaldo', roles: ['frontEnd'] },
			{ id: 'leonardoRibeiro', roles: ['productDesigner'] },
			{ id: 'mySide', roles: ['company'] },
		],
		handler: { backgroundColor: '#000', opacity: 1 },
	},
]
