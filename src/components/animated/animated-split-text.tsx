'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, type Target } from 'motion/react'

import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

const DEFAULT_DELAY = 100
const DEFAULT_DURATION = 0.4
const DEFAULT_THRESHOLD = 0.1
const DEFAULT_ROOT_MARGIN = '-100px'
const DEFAULT_TRANSFORM_Y = '40px'
const SPACE_WIDTH = '0.3em'

const DEFAULT_ANIMATION_FROM = {
	opacity: 0,
	transform: `translate3d(0,${DEFAULT_TRANSFORM_Y},0)`,
} as const
const DEFAULT_ANIMATION_TO = { opacity: 1, transform: 'translate3d(0,0,0)' } as const

interface SplitTextAnimationState {
	opacity: number
	transform: string
}

type EasingPreset =
	| 'linear'
	| 'easeIn'
	| 'easeOut'
	| 'easeInOut'
	| 'circIn'
	| 'circOut'
	| 'circInOut'
	| 'backIn'
	| 'backOut'
	| 'backInOut'
	| 'anticipate'

interface SplitTextProps {
	text?: string
	className?: string
	delay?: number
	duration?: number
	animationFrom?: SplitTextAnimationState
	animationTo?: SplitTextAnimationState
	easing?: EasingPreset | [number, number, number, number]
	threshold?: number
	rootMargin?: string
	textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
	breakWords?: boolean
	onLetterAnimationComplete?: () => void
}

export function AnimatedSplitText({
	text = '',
	className = '',
	delay = DEFAULT_DELAY,
	duration = DEFAULT_DURATION,
	animationFrom,
	animationTo,
	easing = 'linear',
	threshold = DEFAULT_THRESHOLD,
	rootMargin = DEFAULT_ROOT_MARGIN,
	textAlign = 'left',
	breakWords = false,
	onLetterAnimationComplete,
}: Readonly<SplitTextProps>) {
	const ref = useRef<React.ComponentRef<'span'> | null>(null)
	const [reduceMotion, setReduceMotion] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
		setReduceMotion(mq.matches)
		const handler = () => setReduceMotion(mq.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [])

	const inView = useIntersectionObserver(ref, { threshold, rootMargin })

	const words = useMemo(() => text.split(' ').map((word) => word.split('')), [text])
	const lettersCount = useMemo(() => words.flat().length, [words])

	const from = animationFrom ?? DEFAULT_ANIMATION_FROM
	const to = animationTo ?? DEFAULT_ANIMATION_TO

	const safeDuration = reduceMotion ? 0 : Number.isFinite(duration) && duration > 0 ? duration : DEFAULT_DURATION
	const safeDelay = Number.isFinite(delay) && delay >= 0 ? delay : DEFAULT_DELAY

	const baseTransition = useMemo(
		() => ({
			type: 'tween' as const,
			duration: safeDuration,
			ease: easing,
		}),
		[safeDuration, easing],
	)

	const showFinalState = reduceMotion || inView

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
						const isLastLetter = index === lettersCount - 1

						return (
							<motion.span
								key={index}
								className={reduceMotion ? 'inline-block' : 'inline-block will-change-[transform,opacity]'}
								initial={(reduceMotion ? to : from) as Target}
								animate={(showFinalState ? to : from) as Target}
								transition={{
									...baseTransition,
									delay: (index * safeDelay) / 1000,
								}}
								onAnimationComplete={
									isLastLetter && onLetterAnimationComplete ? () => onLetterAnimationComplete() : undefined
								}
							>
								{letter}
							</motion.span>
						)
					})}
					<span style={{ display: 'inline-block', width: SPACE_WIDTH }}>&nbsp;</span>
				</span>
			))}
		</span>
	)
}
