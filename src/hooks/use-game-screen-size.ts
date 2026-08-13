import { useEffect } from 'react'

const MEDIA_QUERY_MIN_WIDTH = '70rem'
const MEDIA_QUERY_MIN_HEIGHT = '35rem'

export function useGameScreenSize(onChange: (allowed: boolean) => void) {
	useEffect(() => {
		if (typeof window === 'undefined') return

		const checkMedia = () => {
			const mediaQuery = window.matchMedia(
				`(min-width: ${MEDIA_QUERY_MIN_WIDTH}) and (min-height: ${MEDIA_QUERY_MIN_HEIGHT})`,
			)
			onChange(mediaQuery.matches)
		}

		checkMedia()
		window.addEventListener('resize', checkMedia)

		return () => window.removeEventListener('resize', checkMedia)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
