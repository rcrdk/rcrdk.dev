'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { SpringConfig } from '@react-spring/web'
import { animated, useSpring } from '@react-spring/web'

const DEFAULT_DISTANCE = 100
const DEFAULT_TENSION = 50
const DEFAULT_FRICTION = 25
const DEFAULT_INITIAL_OPACITY = 0
const DEFAULT_SCALE = 1
const DEFAULT_THRESHOLD = 0.1
const DEFAULT_DELAY = 0

interface AnimatedContentProps {
	children: ReactNode
	className?: string
	distance?: number
	direction?: 'vertical' | 'horizontal'
	reverse?: boolean
	config?: SpringConfig
	initialOpacity?: number
	animateOpacity?: boolean
	scale?: number
	threshold?: number
	rootMargin?: string
	delay?: number
}

const AnimatedContent: React.FC<Readonly<AnimatedContentProps>> = ({
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
	rootMargin,
	delay = DEFAULT_DELAY,
}) => {
	const [inView, setInView] = useState(false)
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true)
					observer.unobserve(element)
				}
			},
			{ threshold, rootMargin },
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [rootMargin, threshold])

	const directions: Record<'vertical' | 'horizontal', string> = {
		vertical: 'Y',
		horizontal: 'X',
	}

	const springProps = useSpring({
		from: {
			transform: `translate${directions[direction]}(${reverse ? `-${distance}px` : `${distance}px`}) scale(${scale})`,
			opacity: animateOpacity ? initialOpacity : 1,
		},
		to: inView ? { transform: 'translateY(0px) scale(1)', opacity: 1 } : undefined,
		config,
		delay,
	})

	const Animated = animated('div')

	return (
		<Animated
			ref={ref}
			style={springProps}
			className={`will-change-transform ${className}`}
			data-state={inView ? 'open' : 'closed'}
		>
			{children}
		</Animated>
	)
}

export default AnimatedContent
