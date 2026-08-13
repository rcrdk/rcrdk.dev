'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState, type ComponentRef } from 'react'

import { MotionDiv } from '@/components/animated/motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/utils'

const DEFAULT_DISTANCE = 90
const DEFAULT_TENSION = 60
const DEFAULT_FRICTION = 15
const DEFAULT_INITIAL_OPACITY = 0
const DEFAULT_SCALE = 1
const DEFAULT_THRESHOLD = 0.1
const DEFAULT_DELAY = 0
const DEFAULT_ROOT_MARGIN = '0px 0px 90px'
const MILLISECONDS_IN_SECOND = 1000

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
	const ref = useRef<ComponentRef<'div'> | null>(null)
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

	const tension = config?.tension
	const friction = config?.friction
	const mass = config?.mass

	const hasValidTension = Number.isFinite(tension) && Number(tension) > 0
	const hasValidFriction = Number.isFinite(friction) && Number(friction) > 0
	const hasValidMass = Number.isFinite(mass)

	const stiffness = hasValidTension ? (tension ?? DEFAULT_TENSION) : DEFAULT_TENSION
	const damping = hasValidFriction ? (friction ?? DEFAULT_FRICTION) : DEFAULT_FRICTION

	const delaySeconds = Number.isFinite(Number(delay)) ? Number(delay) / MILLISECONDS_IN_SECOND : 0

	const transition = useMemo(
		() => ({
			type: 'spring' as const,
			stiffness: Number.isFinite(stiffness) ? stiffness : DEFAULT_TENSION,
			damping: Number.isFinite(damping) ? damping : DEFAULT_FRICTION,
			delay: delaySeconds >= 0 ? delaySeconds : 0,
			...(hasValidMass && { mass }),
		}),
		[stiffness, damping, delaySeconds, hasValidMass, mass],
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
