import confetti from 'canvas-confetti'

import { useSoundEffect } from '@/hooks/use-sound-effect'

const PARTICLE_COUNT = 400
const DEFAULT_ORIGIN_Y = 0.7
const DELAY_CONFETTI_1 = 750
const DELAY_CONFETTI_2 = 1500

const CONFETTI_CONFIGS = {
	FIRST: { particleRatio: 0.25, spread: 26, startVelocity: 55 },
	SECOND: { particleRatio: 0.2, spread: 60 },
	THIRD: { particleRatio: 0.35, spread: 100, decay: 0.91, scalar: 0.8 },
	FOURTH: { particleRatio: 0.1, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
	FIFTH: { particleRatio: 0.1, spread: 120, startVelocity: 45 },
} as const

export function useConfetti() {
	const { playSound } = useSoundEffect()

	const defaults = {
		origin: { y: DEFAULT_ORIGIN_Y },
	}

	function fire(particleRatio: number, options: confetti.Options) {
		confetti({
			...defaults,
			...options,
			particleCount: Math.floor(PARTICLE_COUNT * particleRatio),
		})
	}

	function fireConfetti() {
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
	}

	function fireConfettiWithSound() {
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
	}

	return {
		fireConfetti,
		fireConfettiWithSound,
	}
}
