import { useEffect, useRef, type RefObject } from 'react'
import type { MotionValue } from 'motion/react'

type TouchPoint = TouchEvent['touches'][number]

const SINGLE_TOUCH = 1
const PINCH_TOUCH = 2

type FollowCursorSprings = {
	x: MotionValue<number>
	y: MotionValue<number>
	rotateX: MotionValue<number>
	rotateY: MotionValue<number>
	rotateZ: MotionValue<number>
	scale: MotionValue<number>
	zoom: MotionValue<number>
	wheelY: MotionValue<number>
}

type GestureState = {
	isDragging: boolean
	startX: number
	startY: number
	offsetX: number
	offsetY: number
	pinchStartDistance: number
	pinchStartAngle: number
	initialZoom: number
	initialRotateZ: number
}

const INITIAL_GESTURE_STATE: GestureState = {
	isDragging: false,
	startX: 0,
	startY: 0,
	offsetX: 0,
	offsetY: 0,
	pinchStartDistance: 0,
	pinchStartAngle: 0,
	initialZoom: 0,
	initialRotateZ: 0,
}

const getPinchGeometry = (first: TouchPoint, second: TouchPoint) => ({
	distance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
	angle: Math.atan2(second.clientY - first.clientY, second.clientX - first.clientX),
})

type UseFollowCursorTouchParams = {
	targetRef: RefObject<HTMLDivElement | null>
	springs: FollowCursorSprings
	enabled: boolean
	enableZoom: boolean
	zoomSensitivity: number
	hoverScale: number
}

export function useFollowCursorTouch({
	targetRef,
	springs,
	enabled,
	enableZoom,
	zoomSensitivity,
	hoverScale,
}: UseFollowCursorTouchParams) {
	const gestureRef = useRef<GestureState>(INITIAL_GESTURE_STATE)
	const { x, y, rotateX, rotateY, rotateZ, scale, zoom, wheelY } = springs

	useEffect(() => {
		const card = targetRef.current
		if (!enabled || !card) return

		const startDrag = (touch: TouchPoint) => {
			gestureRef.current = {
				...gestureRef.current,
				isDragging: true,
				startX: touch.clientX,
				startY: touch.clientY,
				offsetX: x.get(),
				offsetY: y.get(),
			}
		}

		const startPinch = (first: TouchPoint, second: TouchPoint) => {
			const { distance, angle } = getPinchGeometry(first, second)

			gestureRef.current = {
				...gestureRef.current,
				pinchStartDistance: distance,
				pinchStartAngle: angle,
				initialZoom: zoom.get(),
				initialRotateZ: rotateZ.get(),
			}
		}

		const moveDrag = (touch: TouchPoint) => {
			const { startX, startY, offsetX, offsetY } = gestureRef.current

			x.set(offsetX + (touch.clientX - startX))
			y.set(offsetY + (touch.clientY - startY))
			rotateX.set(0)
			rotateY.set(0)
			scale.set(1)
		}

		const movePinch = (first: TouchPoint, second: TouchPoint) => {
			const { distance, angle } = getPinchGeometry(first, second)
			const { pinchStartDistance, pinchStartAngle, initialZoom, initialRotateZ } = gestureRef.current

			zoom.set(initialZoom + (distance - pinchStartDistance) / zoomSensitivity)
			rotateZ.set(initialRotateZ + (angle - pinchStartAngle))
		}

		const handleTouchStart = (event: TouchEvent) => {
			const first = event.touches.item(0)
			const second = event.touches.item(1)

			if (event.touches.length === SINGLE_TOUCH && first) return startDrag(first)
			if (event.touches.length === PINCH_TOUCH && enableZoom && first && second) startPinch(first, second)
		}

		const handleTouchMove = (event: TouchEvent) => {
			const first = event.touches.item(0)
			const second = event.touches.item(1)
			const isDraggingSingleTouch = event.touches.length === SINGLE_TOUCH && gestureRef.current.isDragging
			const isPinching = event.touches.length === PINCH_TOUCH && enableZoom

			if (isDraggingSingleTouch && first) return moveDrag(first)
			if (isPinching && first && second) movePinch(first, second)
		}

		const handleTouchEnd = () => {
			gestureRef.current = { ...gestureRef.current, isDragging: false }
			scale.set(hoverScale)
		}

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault()
			wheelY.set(wheelY.get() + event.deltaY)
		}

		card.addEventListener('touchstart', handleTouchStart, { passive: false })
		card.addEventListener('touchmove', handleTouchMove, { passive: false })
		card.addEventListener('touchend', handleTouchEnd)

		if (enableZoom) card.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			card.removeEventListener('touchstart', handleTouchStart)
			card.removeEventListener('touchmove', handleTouchMove)
			card.removeEventListener('touchend', handleTouchEnd)
			card.removeEventListener('wheel', handleWheel)
		}
	}, [
		targetRef,
		x,
		y,
		zoom,
		rotateZ,
		rotateX,
		rotateY,
		scale,
		wheelY,
		enabled,
		enableZoom,
		zoomSensitivity,
		hoverScale,
	])
}

export type { FollowCursorSprings }
