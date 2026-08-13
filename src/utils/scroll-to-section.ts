import type { MouseEvent } from 'react'

export const scrollToSection = (event: MouseEvent<HTMLElement> | null, selector: string) => {
	event?.preventDefault()

	document.querySelector(selector)?.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	})
}
