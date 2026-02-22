'use client'

import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

import { MotionDiv } from '@/components/animated/motion'

interface FollowCursorProps {
	children?: ReactNode
	className?: string
	animationConfig?: {
		mass?: number
		tension?: number
		friction?: number
		[key: string]: unknown
	}
	hoverScale?: number
	offsetX?: number
	offsetY?: number
	cardWidth?: string
	rotationFactor?: number
	perspective?: string
	zoomSensitivity?: number
	wheelConfig?: {
		mass?: number
		tension?: number
		friction?: number
		[key: string]: unknown
	}
	enableTilt?: boolean
	enableZoom?: boolean
	enableDrag?: boolean
	backgroundImage: string
}

const calcX = (y: number, ly: number, containerCenterY: number, rotationFactor: number): number =>
	-(y - ly - containerCenterY) / rotationFactor

const calcY = (x: number, lx: number, containerCenterX: number, rotationFactor: number): number =>
	(x - lx - containerCenterX) / rotationFactor

const isMobile = (): boolean => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

interface TouchState {
	startX?: number
	startY?: number
	offsetX?: number
	offsetY?: number
}

function toMotionSpring(config: { mass?: number; tension?: number; friction?: number }) {
	return {
		mass: config.mass ?? 5,
		stiffness: config.tension ?? 350,
		damping: config.friction ?? 40,
	}
}

const FollowCursor: React.FC<Readonly<FollowCursorProps>> = ({
	children,
	className = '',
	animationConfig = { mass: 5, tension: 350, friction: 40 },
	hoverScale = 1.1,
	offsetX = 20,
	offsetY = 0,
	cardWidth = '200px',
	rotationFactor = 20,
	perspective = '300px',
	zoomSensitivity = 200,
	wheelConfig: _wheelConfig = { mass: 1, tension: 200, friction: 30 },
	enableTilt = true,
	enableZoom = true,
	enableDrag = true,
	backgroundImage,
}) => {
	const domTarget = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const touchState = useRef<TouchState>({})

	const mainSpring = toMotionSpring(animationConfig)

	const x = useSpring(0, mainSpring)
	const y = useSpring(0, mainSpring)
	const rotateX = useSpring(0, mainSpring)
	const rotateY = useSpring(0, mainSpring)
	const rotateZ = useSpring(0, mainSpring)
	const scale = useSpring(1, mainSpring)
	const zoom = useSpring(0, mainSpring)
	const wheelY = useMotionValue(0)

	const scaleWithZoom = useTransform(() => scale.get() + zoom.get())

	const wheelTransform = useTransform(() => {
		const yValue = wheelY.get()
		const imgHeight = containerRef.current
			? containerRef.current.offsetWidth * (parseFloat(cardWidth) / 100) - 20
			: typeof window !== 'undefined'
				? window.innerWidth * 0.3 - 20
				: 200
		return `translateY(${-imgHeight * (yValue < 0 ? 6 : 1) - (yValue % (imgHeight * 5))}px)`
	})

	useEffect(() => {
		if (!isMobile() || !domTarget.current || !enableDrag) return

		const card = domTarget.current
		let isDragging = false
		let pinchStartDistance = 0
		let pinchStartAngle = 0
		let initialZoom = 0
		let initialRotateZ = 0

		const handleTouchStart = (e: TouchEvent) => {
			if (e.touches.length === 1) {
				const touch = e.touches[0]
				touchState.current = {
					startX: touch.clientX,
					startY: touch.clientY,
					offsetX: x.get(),
					offsetY: y.get(),
				}
				isDragging = true
			} else if (e.touches.length === 2 && enableZoom) {
				const touch1 = e.touches[0]
				const touch2 = e.touches[1]
				pinchStartDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
				pinchStartAngle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX)
				initialZoom = zoom.get()
				initialRotateZ = rotateZ.get()
			}
		}

		const handleTouchMove = (e: TouchEvent) => {
			if (!isDragging && e.touches.length !== 2) return

			if (e.touches.length === 1 && isDragging) {
				const touch = e.touches[0]
				const deltaX = touch.clientX - (touchState.current.startX ?? 0)
				const deltaY = touch.clientY - (touchState.current.startY ?? 0)

				x.set((touchState.current.offsetX ?? 0) + deltaX)
				y.set((touchState.current.offsetY ?? 0) + deltaY)
				rotateX.set(0)
				rotateY.set(0)
				scale.set(1)
			} else if (e.touches.length === 2 && enableZoom) {
				const touch1 = e.touches[0]
				const touch2 = e.touches[1]
				const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
				const currentAngle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX)

				const zoomDelta = (currentDistance - pinchStartDistance) / zoomSensitivity
				const rotateDelta = currentAngle - pinchStartAngle

				zoom.set(initialZoom + zoomDelta)
				rotateZ.set(initialRotateZ + rotateDelta)
			}
		}

		const handleTouchEnd = () => {
			isDragging = false
			scale.set(hoverScale)
		}

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()
			wheelY.set(wheelY.get() + e.deltaY)
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
	}, [x, y, zoom, rotateZ, rotateX, rotateY, scale, wheelY, enableDrag, enableZoom, zoomSensitivity, hoverScale])

	useEffect(() => {
		if (!isMobile() && enableTilt && typeof window !== 'undefined') {
			const handleMouseMove = (event: MouseEvent) => {
				const container = containerRef.current
				if (!container) return

				const rect = container.getBoundingClientRect()
				const containerCenterX = rect.left + rect.width / 2
				const containerCenterY = rect.top + rect.height / 2

				const px = event.clientX
				const py = event.clientY

				const xPos = px - containerCenterX
				const yPos = py - containerCenterY

				const parsedCardWidth = parseFloat(cardWidth)
				const calculatedWidth = container.offsetWidth * (parsedCardWidth / 100)
				const calculatedOffsetX = calculatedWidth / 2 + offsetX
				const calculatedOffsetY = calculatedWidth / 2 + offsetY

				x.set(xPos + calculatedOffsetX)
				y.set(yPos + calculatedOffsetY)
				rotateX.set(enableTilt ? calcX(py, y.get(), containerCenterY, rotationFactor) : 0)
				rotateY.set(enableTilt ? calcY(px, x.get(), containerCenterX, rotationFactor) : 0)
				scale.set(hoverScale)
			}

			window.addEventListener('mousemove', handleMouseMove)
			return () => window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [x, y, scale, rotateX, rotateY, cardWidth, offsetX, hoverScale, enableTilt, rotationFactor, offsetY])

	return (
		<div className={className} ref={containerRef}>
			<motion.div
				ref={domTarget}
				className="absolute aspect-square w-[180px] touch-none rounded-xl bg-cover transition-opacity duration-500 [will-change:transform]"
				style={{
					width: cardWidth,
					backgroundImage: `url(${backgroundImage})`,
					perspective,
					x,
					y,
					scale: scaleWithZoom,
					rotateX: enableTilt ? rotateX : 0,
					rotateY: enableTilt ? rotateY : 0,
					rotateZ: enableZoom ? rotateZ : 0,
				}}
			>
				<MotionDiv style={{ transform: wheelTransform }}>{children}</MotionDiv>
			</motion.div>
		</div>
	)
}

export default FollowCursor
