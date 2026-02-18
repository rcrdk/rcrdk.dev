export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, selector: string) => {
	e?.preventDefault()

	document.querySelector(selector)?.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
		inline: 'start',
	})
}
