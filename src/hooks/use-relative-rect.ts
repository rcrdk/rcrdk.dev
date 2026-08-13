'use client'

import { useCallback, useLayoutEffect, useState, type RefObject } from 'react'

import { useResizeObserver } from '@/hooks/use-resize-observer'

export type RelativeRect = { left: number; top: number; width: number; height: number } | null

type UseRelativeRectParams = {
	containerRef: RefObject<HTMLElement | null>
	targetElement: HTMLElement | null
	enabled?: boolean
	runOnMount?: boolean
}

export function useRelativeRect({
	containerRef,
	targetElement,
	enabled = true,
	runOnMount = true,
}: UseRelativeRectParams) {
	const [rect, setRect] = useState<RelativeRect>(null)

	const updateRect = useCallback(() => {
		const container = containerRef.current

		if (!container || !targetElement) {
			setRect(null)
			return
		}

		const containerRect = container.getBoundingClientRect()
		const elementRect = targetElement.getBoundingClientRect()

		setRect({
			left: elementRect.left - containerRect.left,
			top: elementRect.top - containerRect.top,
			width: elementRect.width,
			height: elementRect.height,
		})
	}, [containerRef, targetElement])

	useLayoutEffect(() => updateRect(), [updateRect])

	useResizeObserver(containerRef, updateRect, { enabled, runOnMount })

	return rect
}
