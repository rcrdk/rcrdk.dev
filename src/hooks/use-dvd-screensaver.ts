import { useEffect, useLayoutEffect, useRef, useState, type Ref } from 'react'

import { useWindowSize } from '@/hooks/use-window-size'

const DEFAULT_SPEED = 2
const DEFAULT_ANIMATION_FRAME_ID = 0
const DEFAULT_IMPACT_COUNT = 0
const DEFAULT_POSITION = 0

type Options = {
	freezeOnHover?: boolean
	hoverCallback?: VoidFunction
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
	containerRef: Ref<T>
	elementRef: Ref<T>
	hovered: boolean
	impactCount: number
}

type StepAxisParams = {
	animation: AnimationRef
	containerSpan: number
	elementSpan: number
	delta: number
	toggleRefKey: 'isPosXIncrement' | 'isPosYIncrement'
	positionRefKey: 'positionX' | 'positionY'
	onImpact: (count: number) => void
}

type UpdatePositionParams = {
	containerSpan: number
	delta: number
	elementSpan: number
	previousPosition: number
	isIncrementing: boolean
}

const updatePosition = ({
	containerSpan,
	delta,
	elementSpan,
	previousPosition,
	isIncrementing,
}: UpdatePositionParams) => {
	const parentBoundary = containerSpan - elementSpan
	const nextPosition = previousPosition + (isIncrementing ? delta : -delta)
	const hasImpact = nextPosition <= 0 || nextPosition >= parentBoundary

	if (!hasImpact) return { position: nextPosition, hasImpact }

	const clampedPosition = nextPosition <= 0 ? 0 : parentBoundary

	return { position: clampedPosition, hasImpact }
}

const stepAxis = ({
	animation,
	containerSpan,
	elementSpan,
	delta,
	toggleRefKey,
	positionRefKey,
	onImpact,
}: StepAxisParams) => {
	const { position, hasImpact } = updatePosition({
		containerSpan,
		delta,
		elementSpan,
		previousPosition: animation[positionRefKey],
		isIncrementing: animation[toggleRefKey],
	})

	if (!hasImpact) return position

	animation[toggleRefKey] = !animation[toggleRefKey]
	animation.impactCount += 1
	onImpact(animation.impactCount)

	return position
}

export function useDvdScreensaver<T extends HTMLDivElement>(options?: Partial<Options>): UseDvdScreensaver<T> {
	const { width: windowWidth } = useWindowSize()

	const animationRef = useRef<AnimationRef>({
		animationFrameId: DEFAULT_ANIMATION_FRAME_ID,
		containerHeight: DEFAULT_POSITION,
		containerWidth: DEFAULT_POSITION,
		impactCount: DEFAULT_IMPACT_COUNT,
		isPosXIncrement: true,
		isPosYIncrement: true,
		positionX: Math.random() * windowWidth,
		positionY: Math.random() * windowWidth,
	})
	const elementRef = useRef<T>(null)
	const containerRef = useRef<T>(null)
	const [impactCount, setImpactCount] = useState<number>(0)
	const [hovered, setHovered] = useState<boolean>(false)

	function animate() {
		const element = elementRef.current
		const parent = element?.parentElement

		if (element && parent) {
			const axisParams = {
				animation: animationRef.current,
				delta: options?.speed || DEFAULT_SPEED,
				onImpact: setImpactCount,
			}

			const positionX = stepAxis({
				...axisParams,
				containerSpan: parent.clientWidth,
				elementSpan: element.clientWidth,
				toggleRefKey: 'isPosXIncrement',
				positionRefKey: 'positionX',
			})

			const positionY = stepAxis({
				...axisParams,
				containerSpan: parent.clientHeight,
				elementSpan: element.clientHeight,
				toggleRefKey: 'isPosYIncrement',
				positionRefKey: 'positionY',
			})

			element.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)`
			animationRef.current.positionX = positionX
			animationRef.current.positionY = positionY
		}

		animationRef.current.animationFrameId = requestAnimationFrame(animate)
	}

	useEffect(() => {
		const shouldFreeze = options?.freezeOnHover && hovered
		const shouldResume = options?.freezeOnHover && !hovered && !animationRef.current.animationFrameId

		if (shouldFreeze) {
			cancelAnimationFrame(animationRef.current.animationFrameId)
			animationRef.current.animationFrameId = DEFAULT_ANIMATION_FRAME_ID
		}

		if (shouldResume) animationRef.current.animationFrameId = requestAnimationFrame(animate)

		options?.hoverCallback?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hovered, options])

	useLayoutEffect(() => {
		const element = elementRef.current
		const animation = animationRef.current
		const handleMouseOver = () => setHovered(true)
		const handleMouseOut = () => setHovered(false)

		if (element) {
			element.style.willChange = 'transform'
			element.addEventListener('mouseover', handleMouseOver)
			element.addEventListener('mouseout', handleMouseOut)
			animation.animationFrameId = requestAnimationFrame(animate)
		}

		return () => {
			if (element) {
				element.removeEventListener('mouseover', handleMouseOver)
				element.removeEventListener('mouseout', handleMouseOut)
			}

			cancelAnimationFrame(animation.animationFrameId)
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
