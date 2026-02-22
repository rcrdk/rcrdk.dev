'use client'

import { useEffect, useState, type RefObject } from 'react'

interface UseIntersectionObserverOptions {
	threshold?: number | number[]
	rootMargin?: string
	once?: boolean
}

export function useIntersectionObserver(
	ref: RefObject<Element | null>,
	options: UseIntersectionObserverOptions = {},
): boolean {
	const { threshold, rootMargin, once = true } = options
	const [isIntersecting, setIsIntersecting] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting)
				if (entry.isIntersecting && once) observer.unobserve(el)
			},
			{ threshold, rootMargin },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [ref, threshold, rootMargin, once])

	return isIntersecting
}
