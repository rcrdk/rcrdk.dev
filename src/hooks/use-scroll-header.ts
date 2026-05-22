'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_TOP_OFFSET = 72

interface Options {
	topOffset?: number
}

const getScrollY = () => Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)

export function useScrollHeader({ topOffset = DEFAULT_TOP_OFFSET }: Options = {}) {
	const [visible, setVisible] = useState(true)
	const lastScrollY = useRef(0)
	const ticking = useRef(false)

	useEffect(() => {
		const update = () => {
			const scrollY = getScrollY()
			const previousScrollY = lastScrollY.current

			if (scrollY <= topOffset) {
				setVisible(true)
			} else if (scrollY > previousScrollY) {
				setVisible(false)
			} else if (scrollY < previousScrollY) {
				setVisible(true)
			}

			lastScrollY.current = scrollY
			ticking.current = false
		}

		const handleScroll = () => {
			if (ticking.current) return

			ticking.current = true
			requestAnimationFrame(update)
		}

		lastScrollY.current = getScrollY()

		window.addEventListener('scroll', handleScroll, { passive: true })
		document.body.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			document.body.removeEventListener('scroll', handleScroll)
		}
	}, [topOffset])

	return { visible }
}
