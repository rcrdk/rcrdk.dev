import type { KnipConfig } from 'knip'

export default {
	compilers: {
		css: (text: string) => [...text.replaceAll('plugin', 'import').matchAll(/(?<=@)import[^;]+/g)].join('\n'),
	},
} satisfies KnipConfig
