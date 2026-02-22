'use client'

import { useEffect, type RefObject } from 'react'

interface UseResizeObserverOptions {
	enabled?: boolean

	runOnMount?: boolean
}

export function useResizeObserver(
	ref: RefObject<Element | null>,
	callback: () => void,
	options: UseResizeObserverOptions = {},
): void {
	const { enabled = true, runOnMount = true } = options

	useEffect(() => {
		const el = ref.current
		if (!el || !enabled) return

		if (runOnMount) callback()

		const observer = new window.ResizeObserver(callback)
		observer.observe(el)
		return () => observer.disconnect()
	}, [ref, enabled, runOnMount, callback])
}
