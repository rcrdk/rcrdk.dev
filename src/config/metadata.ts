import type { Metadata } from 'next'

export const ignorePagesRobots: NonNullable<Metadata['robots']> = {
	index: false,
	follow: false,
	nocache: true,
	googleBot: {
		index: false,
		follow: false,
		noimageindex: true,
	},
}
