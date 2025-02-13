'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { SpringConfig } from '@react-spring/web'
import { animated, useSpring } from '@react-spring/web'

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

const AnimatedContent: React.FC<AnimatedContentProps> = ({
	children,
	className,
	distance = 100,
	direction = 'vertical',
	reverse = false,
	config = { tension: 50, friction: 25 },
	initialOpacity = 0,
	animateOpacity = true,
	scale = 1,
	threshold = 0.1,
	rootMargin,
	delay = 0,
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
		<Animated ref={ref} style={springProps} className={className} data-state={inView ? 'open' : 'closed'}>
			{children}
		</Animated>
	)
}

export default AnimatedContent
