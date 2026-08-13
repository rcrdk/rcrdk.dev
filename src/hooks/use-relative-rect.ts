'use client'

import { useCallback, useLayoutEffect, useState, type RefObject } from 'react'

import { useResizeObserver } from '@/hooks/use-resize-observer'

export type RelativeRect = { left: number; top: number; width: number; height: number } | null

type UseRelativeRectParams = {
	containerRef: RefObject<HTMLElement | null>
	/** Resolved inside the layout effect — keep it memoized so the rect only recomputes when the target changes. */
	getTarget: () => HTMLElement | null
	enabled?: boolean
	runOnMount?: boolean
}

export function useRelativeRect({ containerRef, getTarget, enabled = true, runOnMount = true }: UseRelativeRectParams) {
	const [rect, setRect] = useState<RelativeRect>(null)

	const updateRect = useCallback(() => {
		const container = containerRef.current
		const target = getTarget()

		if (!container || !target) {
			setRect(null)
			return
		}

		const containerRect = container.getBoundingClientRect()
		const targetRect = target.getBoundingClientRect()

		setRect({
			left: targetRect.left - containerRect.left,
			top: targetRect.top - containerRect.top,
			width: targetRect.width,
			height: targetRect.height,
		})
	}, [containerRef, getTarget])

	useLayoutEffect(() => updateRect(), [updateRect])

	useResizeObserver(containerRef, updateRect, { enabled, runOnMount })

	return rect
}
