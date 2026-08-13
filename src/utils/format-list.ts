const DEFAULT_OPTIONS: Intl.ListFormatOptions = {
	style: 'long',
	type: 'conjunction',
}

const DEFAULT_LOCALE = 'en'

type FormatListParams = {
	items: string[] | undefined
	locale?: string
	options?: Intl.ListFormatOptions
}

export const formatList = ({ items, locale, options = DEFAULT_OPTIONS }: FormatListParams): string => {
	if (!items || items.length === 0) return ''

	const formatter = new Intl.ListFormat(locale ?? DEFAULT_LOCALE, options)
	const formatted = formatter.format(items)

	return formatted
}
