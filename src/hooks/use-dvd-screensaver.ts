import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useWindowSize } from '@/hooks/use-window-size'

type Options = {
	freezeOnHover?: boolean
	hoverCallback?: () => void
	speed?: number
}

type AnimationRef = {
	animationFrameId: number
	containerHeight: number
	containerWidth: number
	impactCount: number
	isPosXIncrement: boolean
	isPosYIncrement: boolean
	positionX: number
	positionY: number
}

type UseDvdScreensaver<T> = {
	containerRef: React.Ref<T>
	elementRef: React.Ref<T>
	hovered: boolean
	impactCount: number
}

export function useDvdScreensaver<T extends HTMLDivElement>(options?: Partial<Options>): UseDvdScreensaver<T> {
	const { width: windowWidth } = useWindowSize()

	const animationRef = useRef<AnimationRef>({
		animationFrameId: 0,
		containerHeight: 0,
		containerWidth: 0,
		impactCount: 0,
		isPosXIncrement: true,
		isPosYIncrement: true,
		positionX: Math.random() * windowWidth,
		positionY: Math.random() * windowWidth,
	})
	const elementRef = useRef<T>(null)
	const containerRef = useRef<T>(null)
	const [impactCount, setImpactCount] = useState<number>(0)
	const [hovered, setHovered] = useState<boolean>(false)

	function updatePosition(
		containerSpan: number,
		delta: number,
		elementSpan: number,
		prevPos: number,
		toggleRefKey: 'isPosXIncrement' | 'isPosYIncrement',
	): number {
		const parentBoundary = containerSpan - elementSpan
		let newPos = prevPos + (animationRef.current[toggleRefKey] ? delta : -delta)
		if (newPos <= 0 || newPos >= parentBoundary) {
			animationRef.current[toggleRefKey] = !animationRef.current[toggleRefKey]
			animationRef.current.impactCount += 1
			setImpactCount(animationRef.current.impactCount)
			newPos = newPos <= 0 ? 0 : parentBoundary
		}
		return newPos
	}

	function animate() {
		if (elementRef.current && elementRef.current.parentElement) {
			const containerHeight = elementRef.current.parentElement.clientHeight
			const containerWidth = elementRef.current.parentElement.clientWidth
			const elementHeight = elementRef.current.clientHeight
			const elementWidth = elementRef.current.clientWidth
			const delta = options?.speed || 2

			const posX = updatePosition(
				containerWidth,
				delta,
				elementWidth,
				animationRef.current.positionX,
				'isPosXIncrement',
			)
			const posY = updatePosition(
				containerHeight,
				delta,
				elementHeight,
				animationRef.current.positionY,
				'isPosYIncrement',
			)

			elementRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
			animationRef.current.positionX = posX
			animationRef.current.positionY = posY
		}

		animationRef.current.animationFrameId = requestAnimationFrame(animate)
	}

	useEffect(() => {
		if (options?.freezeOnHover) {
			if (hovered) {
				cancelAnimationFrame(animationRef.current.animationFrameId)
				animationRef.current.animationFrameId = 0
			}
			if (!hovered && !animationRef.current.animationFrameId) {
				animationRef.current.animationFrameId = requestAnimationFrame(animate)
			}
		}
		if (options?.hoverCallback) {
			options.hoverCallback()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hovered, options])

	useLayoutEffect(() => {
		const element = elementRef.current
		const handleMouseOver = () => setHovered(true)
		const handleMouseOut = () => setHovered(false)

		if (element) {
			element.style.willChange = 'transform'
			element.addEventListener('mouseover', handleMouseOver)
			element.addEventListener('mouseout', handleMouseOut)
			animationRef.current.animationFrameId = requestAnimationFrame(animate)
		}

		return () => {
			if (element) {
				element.removeEventListener('mouseover', handleMouseOver)
				element.removeEventListener('mouseout', handleMouseOut)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
			cancelAnimationFrame(animationRef.current.animationFrameId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		containerRef,
		elementRef,
		hovered,
		impactCount,
	}
}
