'use client'

import { useCallback, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import type { Options } from 'canvas-confetti'

import { useSoundEffect } from '@/hooks/use-sound-effect'

const PARTICLE_COUNT = 400
const DEFAULT_ORIGIN_Y = 0.7
const DELAY_CONFETTI_1 = 750
const DELAY_CONFETTI_2 = 1500

const CONFETTI_Z_INDEX = 1000

const CONFETTI_CONFIGS = {
	FIRST: { particleRatio: 0.25, spread: 26, startVelocity: 55 },
	SECOND: { particleRatio: 0.2, spread: 60 },
	THIRD: { particleRatio: 0.35, spread: 100, decay: 0.91, scalar: 0.8 },
	FOURTH: { particleRatio: 0.1, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
	FIFTH: { particleRatio: 0.1, spread: 120, startVelocity: 45 },
} as const

const CONFETTI_DEFAULTS: Options = {
	origin: { y: DEFAULT_ORIGIN_Y },
	zIndex: CONFETTI_Z_INDEX,
	disableForReducedMotion: false,
}

export function useConfetti() {
	const { playSound } = useSoundEffect()
	const confettiRef = useRef<ReturnType<typeof confetti.create> | null>(null)

	useEffect(() => {
		confettiRef.current = confetti.create(undefined, {
			resize: true,
			useWorker: false,
			disableForReducedMotion: false,
		})

		return () => {
			confettiRef.current?.reset()
			confettiRef.current = null
		}
	}, [])

	const fire = useCallback((particleRatio: number, options: Options) => {
		confettiRef.current?.({
			...CONFETTI_DEFAULTS,
			...options,
			particleCount: Math.floor(PARTICLE_COUNT * particleRatio),
		})
	}, [])

	const fireConfetti = useCallback(() => {
		const { FIRST, SECOND, THIRD, FOURTH, FIFTH } = CONFETTI_CONFIGS

		const { particleRatio: firstParticleRatio, ...firstOptions } = FIRST
		const { particleRatio: secondParticleRatio, ...secondOptions } = SECOND
		const { particleRatio: thirdParticleRatio, ...thirdOptions } = THIRD
		const { particleRatio: fourthParticleRatio, ...fourthOptions } = FOURTH
		const { particleRatio: fifthParticleRatio, ...fifthOptions } = FIFTH

		fire(firstParticleRatio, firstOptions)
		fire(secondParticleRatio, secondOptions)
		fire(thirdParticleRatio, thirdOptions)
		fire(fourthParticleRatio, fourthOptions)
		fire(fifthParticleRatio, fifthOptions)
	}, [fire])

	const fireConfettiWithSound = useCallback(() => {
		fireConfetti()
		playSound('confetti-pop')

		const timer1 = setTimeout(() => {
			fireConfetti()
			playSound('confetti-pop')
		}, DELAY_CONFETTI_1)

		const timer2 = setTimeout(() => {
			fireConfetti()
			playSound('confetti-pop')
		}, DELAY_CONFETTI_2)

		return () => {
			clearTimeout(timer1)
			clearTimeout(timer2)
		}
	}, [fireConfetti, playSound])

	return {
		fireConfetti,
		fireConfettiWithSound,
	}
}
