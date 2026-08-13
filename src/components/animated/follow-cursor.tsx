'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

import { MotionDiv } from '@/components/animated/motion'
import { useFollowCursorTilt } from '@/hooks/use-follow-cursor-tilt'
import { useFollowCursorTouch } from '@/hooks/use-follow-cursor-touch'

const DEFAULT_MASS = 5
const DEFAULT_TENSION = 350
const DEFAULT_FRICTION = 40
const DEFAULT_HOVER_SCALE = 1.1
const DEFAULT_OFFSET_X = 20
const DEFAULT_OFFSET_Y = 0
const DEFAULT_CARD_WIDTH = '200px'
const DEFAULT_ROTATION_FACTOR = 20
const DEFAULT_PERSPECTIVE = '300px'
const DEFAULT_ZOOM_SENSITIVITY = 200
const PERCENT_DIVISOR = 100
const IMAGE_HEIGHT_GAP = 20
const FALLBACK_IMAGE_HEIGHT = 200
const VIEWPORT_WIDTH_RATIO = 0.3
const WHEEL_LOOP_UP = 6
const WHEEL_LOOP_DOWN = 1
const WHEEL_LOOP_LENGTH = 5

interface FollowCursorProps {
	children?: ReactNode
	className?: string
	animationConfig?: {
		mass?: number
		tension?: number
		friction?: number
	}
	hoverScale?: number
	offsetX?: number
	offsetY?: number
	cardWidth?: string
	rotationFactor?: number
	perspective?: string
	zoomSensitivity?: number
	enableTilt?: boolean
	enableZoom?: boolean
	enableDrag?: boolean
	backgroundImage: string
}

const isMobile = (): boolean => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const toMotionSpring = (config: { mass?: number; tension?: number; friction?: number }) => ({
	mass: config.mass ?? DEFAULT_MASS,
	stiffness: config.tension ?? DEFAULT_TENSION,
	damping: config.friction ?? DEFAULT_FRICTION,
})

const getImageHeight = (container: HTMLDivElement | null, cardWidth: string) => {
	if (container) return container.offsetWidth * (parseFloat(cardWidth) / PERCENT_DIVISOR) - IMAGE_HEIGHT_GAP
	if (typeof window !== 'undefined') return window.innerWidth * VIEWPORT_WIDTH_RATIO - IMAGE_HEIGHT_GAP

	return FALLBACK_IMAGE_HEIGHT
}

export function FollowCursor({
	children,
	className = '',
	animationConfig = { mass: DEFAULT_MASS, tension: DEFAULT_TENSION, friction: DEFAULT_FRICTION },
	hoverScale = DEFAULT_HOVER_SCALE,
	offsetX = DEFAULT_OFFSET_X,
	offsetY = DEFAULT_OFFSET_Y,
	cardWidth = DEFAULT_CARD_WIDTH,
	rotationFactor = DEFAULT_ROTATION_FACTOR,
	perspective = DEFAULT_PERSPECTIVE,
	zoomSensitivity = DEFAULT_ZOOM_SENSITIVITY,
	enableTilt = true,
	enableZoom = true,
	enableDrag = true,
	backgroundImage,
}: Readonly<FollowCursorProps>) {
	const domTarget = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	const [isMobileDevice, setIsMobileDevice] = useState(false)

	useEffect(() => setIsMobileDevice(isMobile()), [])

	const mainSpring = toMotionSpring(animationConfig)

	const springs = {
		x: useSpring(0, mainSpring),
		y: useSpring(0, mainSpring),
		rotateX: useSpring(0, mainSpring),
		rotateY: useSpring(0, mainSpring),
		rotateZ: useSpring(0, mainSpring),
		scale: useSpring(1, mainSpring),
		zoom: useSpring(0, mainSpring),
		wheelY: useMotionValue(0),
	}

	const { x, y, rotateX, rotateY, rotateZ, scale, zoom, wheelY } = springs

	const scaleWithZoom = useTransform(() => scale.get() + zoom.get())

	const wheelTransform = useTransform(() => {
		const yValue = wheelY.get()
		const imgHeight = getImageHeight(containerRef.current, cardWidth)
		const loopFactor = yValue < 0 ? WHEEL_LOOP_UP : WHEEL_LOOP_DOWN

		return `translateY(${-imgHeight * loopFactor - (yValue % (imgHeight * WHEEL_LOOP_LENGTH))}px)`
	})

	useFollowCursorTouch({
		targetRef: domTarget,
		springs,
		enabled: enableDrag && isMobileDevice,
		enableZoom,
		zoomSensitivity,
		hoverScale,
	})

	useFollowCursorTilt({
		containerRef,
		springs,
		enabled: enableTilt && !isMobileDevice,
		cardWidth,
		offsetX,
		offsetY,
		rotationFactor,
		hoverScale,
	})

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
