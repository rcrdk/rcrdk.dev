import { useEffect, type RefObject } from 'react'

import type { FollowCursorSprings } from '@/hooks/use-follow-cursor-touch'

const PERCENT_DIVISOR = 100
const HALF = 2

const calcRotateX = (pointerY: number, currentY: number, centerY: number, rotationFactor: number): number =>
	-(pointerY - currentY - centerY) / rotationFactor

const calcRotateY = (pointerX: number, currentX: number, centerX: number, rotationFactor: number): number =>
	(pointerX - currentX - centerX) / rotationFactor

type UseFollowCursorTiltParams = {
	containerRef: RefObject<HTMLDivElement | null>
	springs: FollowCursorSprings
	enabled: boolean
	cardWidth: string
	offsetX: number
	offsetY: number
	rotationFactor: number
	hoverScale: number
}

export function useFollowCursorTilt({
	containerRef,
	springs,
	enabled,
	cardWidth,
	offsetX,
	offsetY,
	rotationFactor,
	hoverScale,
}: UseFollowCursorTiltParams) {
	const { x, y, rotateX, rotateY, scale } = springs

	useEffect(() => {
		if (!enabled || typeof window === 'undefined') return

		const handleMouseMove = (event: MouseEvent) => {
			const container = containerRef.current
			if (!container) return

			const rect = container.getBoundingClientRect()
			const centerX = rect.left + rect.width / HALF
			const centerY = rect.top + rect.height / HALF

			const calculatedWidth = container.offsetWidth * (parseFloat(cardWidth) / PERCENT_DIVISOR)
			const calculatedOffsetX = calculatedWidth / HALF + offsetX
			const calculatedOffsetY = calculatedWidth / HALF + offsetY

			x.set(event.clientX - centerX + calculatedOffsetX)
			y.set(event.clientY - centerY + calculatedOffsetY)
			rotateX.set(calcRotateX(event.clientY, y.get(), centerY, rotationFactor))
			rotateY.set(calcRotateY(event.clientX, x.get(), centerX, rotationFactor))
			scale.set(hoverScale)
		}

		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [containerRef, x, y, scale, rotateX, rotateY, cardWidth, offsetX, offsetY, hoverScale, enabled, rotationFactor])
}
