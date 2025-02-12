export function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, selector: string) {
	e.preventDefault()

	document.querySelector(selector)?.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
		inline: 'start',
	})
}
