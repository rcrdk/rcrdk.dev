'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { MotionDiv } from '@/components/animated/motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/utils/tailwind-cn'

const DEFAULT_DISTANCE = 90
const DEFAULT_TENSION = 60
const DEFAULT_FRICTION = 15
const DEFAULT_INITIAL_OPACITY = 0
const DEFAULT_SCALE = 1
const DEFAULT_THRESHOLD = 0.1
const DEFAULT_DELAY = 0
const DEFAULT_ROOT_MARGIN = '0px 0px 90px'

const IN_VIEW_ANIMATION = { x: 0, y: 0, scale: 1, opacity: 1 } as const

interface AnimatedContentConfig {
	tension?: number
	friction?: number
	mass?: number
}

interface AnimatedContentProps {
	children: ReactNode
	className?: string
	distance?: number
	direction?: 'vertical' | 'horizontal'
	reverse?: boolean
	config?: AnimatedContentConfig
	initialOpacity?: number
	animateOpacity?: boolean
	scale?: number
	threshold?: number
	rootMargin?: string
	delay?: number
}

export function AnimatedContent({
	children,
	className,
	distance = DEFAULT_DISTANCE,
	direction = 'vertical',
	reverse = false,
	config = { tension: DEFAULT_TENSION, friction: DEFAULT_FRICTION },
	initialOpacity = DEFAULT_INITIAL_OPACITY,
	animateOpacity = true,
	scale = DEFAULT_SCALE,
	threshold = DEFAULT_THRESHOLD,
	rootMargin = DEFAULT_ROOT_MARGIN,
	delay = DEFAULT_DELAY,
}: Readonly<AnimatedContentProps>) {
	const ref = useRef<React.ComponentRef<'div'> | null>(null)
	const inView = useIntersectionObserver(ref, { threshold, rootMargin })
	const [reduceMotion, setReduceMotion] = useState(false)
	const [animationDone, setAnimationDone] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
		setReduceMotion(mq.matches)
		const handler = () => setReduceMotion(mq.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [])

	const safeDistance = Number.isFinite(distance) ? distance : DEFAULT_DISTANCE
	const offset = reverse ? -safeDistance : safeDistance
	const isVertical = direction === 'vertical'
	const safeScale = Number.isFinite(scale) ? scale : DEFAULT_SCALE
	const safeInitialOpacity = Number.isFinite(initialOpacity) ? initialOpacity : DEFAULT_INITIAL_OPACITY

	const hasValidTension = config?.tension != null && Number.isFinite(config.tension) && config.tension > 0
	const hasValidFriction = config?.friction != null && Number.isFinite(config.friction) && config.friction > 0

	const stiffness = hasValidTension ? (config?.tension ?? DEFAULT_TENSION) : DEFAULT_TENSION
	const damping = hasValidFriction ? (config?.friction ?? DEFAULT_FRICTION) : DEFAULT_FRICTION

	const delaySeconds = Number.isFinite(Number(delay)) ? Number(delay) / 1000 : 0
	const hasValidMass = config?.mass != null && Number.isFinite(config.mass)

	const transition = useMemo(
		() => ({
			type: 'spring' as const,
			stiffness: Number.isFinite(stiffness) ? stiffness : DEFAULT_TENSION,
			damping: Number.isFinite(damping) ? damping : DEFAULT_FRICTION,
			delay: delaySeconds >= 0 ? delaySeconds : 0,
			...(hasValidMass && config?.mass != null && { mass: config.mass }),
		}),
		[stiffness, damping, delaySeconds, hasValidMass, config?.mass],
	)

	const initial = useMemo(
		() =>
			reduceMotion
				? IN_VIEW_ANIMATION
				: {
						x: isVertical ? 0 : offset,
						y: isVertical ? offset : 0,
						scale: safeScale,
						opacity: animateOpacity ? safeInitialOpacity : 1,
					},
		[reduceMotion, isVertical, offset, safeScale, animateOpacity, safeInitialOpacity],
	)

	const state = inView ? 'open' : 'closed'
	const showFinalState = reduceMotion || inView
	const keepWillChange = !animationDone && !showFinalState

	return (
		<MotionDiv
			ref={ref}
			className={cn(keepWillChange && 'will-change-transform', className)}
			data-state={state}
			initial={initial}
			animate={showFinalState ? IN_VIEW_ANIMATION : undefined}
			transition={reduceMotion ? { duration: 0 } : transition}
			onAnimationComplete={inView ? () => setAnimationDone(true) : undefined}
		>
			{children}
		</MotionDiv>
	)
}
