const defaultOptions: Intl.ListFormatOptions = {
	style: 'long',
	type: 'conjunction',
}

export const formatList = (items: string[] | undefined, locale?: string, options = defaultOptions): string => {
	if (!items || items.length === 0) return ''

	const formatter = new Intl.ListFormat(locale ?? 'en', options)
	return formatter.format(items)
}
