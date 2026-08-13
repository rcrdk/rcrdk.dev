import type { HistoryProjectDescription } from '@/types/history'

// Security invariant: `description` may only carry markup authored in `src/data/`
// or `src/i18n/messages/`, which are committed and reviewed. Never pass user-,
// CMS-, or API-supplied strings here — `dangerouslySetInnerHTML` does not escape.

const PARAGRAPH_BASE_CLASSNAME = '[&>a]:text-accent-blue text-pretty text-black/75 dark:text-white/75 [&>a]:underline'

const VARIANT_CLASSNAMES = {
	page: {
		title:
			'font-heading mb-6 text-2xl font-bold tracking-tight text-balance md:text-3xl lg:text-4xl dark:text-white [&:not(:first-child)]:mt-8',
		paragraph: `${PARAGRAPH_BASE_CLASSNAME} [&:not(:first-child)]:mt-4`,
	},
	dialog: {
		title:
			'font-heading mb-6 text-xl font-bold tracking-tight text-balance md:text-2xl lg:text-3xl dark:text-white [&:not(:first-child)]:mt-6',
		paragraph: `${PARAGRAPH_BASE_CLASSNAME} [&:not(:first-child)]:mt-2`,
	},
}

interface ProjectDescriptionProps {
	description: HistoryProjectDescription
	variant: keyof typeof VARIANT_CLASSNAMES
}

export function ProjectDescription({ description, variant }: Readonly<ProjectDescriptionProps>) {
	const classNames = VARIANT_CLASSNAMES[variant]

	if (typeof description === 'string')
		return <p className={PARAGRAPH_BASE_CLASSNAME} dangerouslySetInnerHTML={{ __html: description }} />

	return description.map((item) => {
		if (item.type === 'title')
			return <h2 key={item.value} className={classNames.title} dangerouslySetInnerHTML={{ __html: item.value }} />

		return <p key={item.value} className={classNames.paragraph} dangerouslySetInnerHTML={{ __html: item.value }} />
	})
}
