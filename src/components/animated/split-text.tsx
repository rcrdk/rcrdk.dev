'use client'

import { useEffect, useRef, useState } from 'react'
import type { SpringConfig } from '@react-spring/web'
import { animated, useSprings } from '@react-spring/web'

const DEFAULT_DELAY = 100
const DEFAULT_THRESHOLD = 0.1
const DEFAULT_ROOT_MARGIN = '-100px'
const DEFAULT_TRANSFORM_Y = '40px'
const SPACE_WIDTH = '0.3em'

interface SplitTextProps {
	text?: string
	className?: string
	delay?: number
	animationFrom?: { opacity: number; transform: string }
	animationTo?: { opacity: number; transform: string }
	easing?: SpringConfig['easing']
	threshold?: number
	rootMargin?: string
	textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
	breakWords?: boolean
	onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<Readonly<SplitTextProps>> = ({
	text = '',
	className = '',
	delay = DEFAULT_DELAY,
	animationFrom = { opacity: 0, transform: `translate3d(0,${DEFAULT_TRANSFORM_Y},0)` },
	animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
	easing = (t: number) => t,
	threshold = DEFAULT_THRESHOLD,
	rootMargin = DEFAULT_ROOT_MARGIN,
	textAlign = 'left',
	breakWords = false,
	onLetterAnimationComplete,
}) => {
	const words = text.split(' ').map((word) => word.split(''))
	const letters = words.flat()
	const [inView, setInView] = useState(false)
	const ref = useRef<HTMLParagraphElement>(null)
	const animatedCount = useRef(0)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true)
					if (ref.current) observer.unobserve(ref.current)
				}
			},
			{ threshold, rootMargin },
		)

		if (ref.current) observer.observe(ref.current)

		return () => observer.disconnect()
	}, [threshold, rootMargin])

	const springs = useSprings(
		letters.length,
		letters.map((_, i) => ({
			from: animationFrom,
			to: inView
				? async (next: (props: unknown) => Promise<void>) => {
						await next(animationTo)
						animatedCount.current += 1
						if (animatedCount.current === letters.length && onLetterAnimationComplete) onLetterAnimationComplete()
					}
				: animationFrom,
			delay: i * delay,
			config: { easing },
		})),
	)

	const Animated = animated('span')

	return (
		<span
			ref={ref}
			className={`split-parent inline overflow-hidden ${className}`}
			style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
		>
			{words.map((word, wordIndex) => (
				<span
					key={wordIndex}
					style={{
						display: breakWords ? 'block' : 'inline-block',
						textAlign: 'left',
						whiteSpace: 'nowrap',
					}}
				>
					{word.map((letter, letterIndex) => {
						const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex

						return (
							<Animated
								key={index}
								style={springs[index] as unknown as React.CSSProperties}
								className="inline-block transform transition-opacity will-change-[transform,opacity]"
							>
								{letter}
							</Animated>
						)
					})}
					<span style={{ display: 'inline-block', width: SPACE_WIDTH }}>&nbsp;</span>
				</span>
			))}
		</span>
	)
}

export default SplitText
