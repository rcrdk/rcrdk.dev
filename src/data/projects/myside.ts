import type { HistoryProject } from '@/types/history'

// TODO: Gallery, Description [Introdução, Meu Papel, Desafios técnicos, Impacto]
export const MYSIDE_PROJECTS: HistoryProject[] = [
	{
		id: 'heropwa',
		slug: 'hero-mobile',
		companySlug: 'myside',
		categories: ['Web App', 'PWA'],
		image: '/projects/hero-mobile.jpg',
		links: { behance: null, github: null, website: 'https://myside.com.br' },
		stack: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'CVA', 'Radix UI', 'shadcn/ui', 'Framer Motion', 'TanStack Query', 'TanStack Virtual', 'React Hook Form', 'Zod', 'Tiptap', 'Sonner', 'Vaul', 'Embla Carousel', 'PWA', 'Service Worker', 'IndexedDB', 'Local Storage', 'APIs Rest', 'Auth.js', 'Sentry', 'Jest', 'React Testing Library', 'date-fns', 'React Day Picker', 'Figma'],
		year: 2025,
		'pt-br': {
			title: 'Hero Mobile',
			description: '',
		},
		en: { title: 'Hero Mobile', description: '' },
		gallery: [],
		attributions: [
			{ id: 'rcrdk', roles: ['frontEnd'] },
			{ id: 'marlonberaldo', roles: ['frontEnd'] },
			{ id: 'bruch0', roles: ['frontEnd'] },
			{ id: 'leonardoRibeiro', roles: ['productDesigner'] },
			{ id: 'mySide', roles: ['company'] },
		],
	},
	{
		id: 'herodesktop',
		slug: 'hero-desktop',
		companySlug: 'myside',
		categories: ['Web App'],
		image: '/projects/hero-desktop.jpg',
		links: { behance: null, github: null, website: 'https://myside.com.br' },
		stack: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'CVA', 'Radix UI', 'shadcn/ui', 'Framer Motion', 'TanStack Query', 'React Hook Form', 'Zod', 'Tiptap', 'Sonner', 'Vaul', 'Swiper', 'DnD Kit', 'React Dropzone', 'IndexedDB', 'Local Storage', 'Session Storage', 'APIs Rest', 'Auth.js', 'Google Maps API', 'Sentry', 'Jest', 'React Testing Library', 'date-fns', 'React Day Picker', 'Markdown', 'Puppeteer', 'Figma'],
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
	},
]
