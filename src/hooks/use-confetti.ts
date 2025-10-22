import confetti from 'canvas-confetti'

const PARTICLE_COUNT = 400
const DEFAULT_ORIGIN_Y = 0.7
const CONFETTI_CONFIGS = {
	FIRST: { particleRatio: 0.25, spread: 26, startVelocity: 55 },
	SECOND: { particleRatio: 0.2, spread: 60 },
	THIRD: { particleRatio: 0.35, spread: 100, decay: 0.91, scalar: 0.8 },
	FOURTH: { particleRatio: 0.1, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
	FIFTH: { particleRatio: 0.1, spread: 120, startVelocity: 45 },
} as const

export function useConfetti() {
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

	return {
		fireConfetti() {
			fire(CONFETTI_CONFIGS.FIRST.particleRatio, {
				spread: CONFETTI_CONFIGS.FIRST.spread,
				startVelocity: CONFETTI_CONFIGS.FIRST.startVelocity,
			})

			fire(CONFETTI_CONFIGS.SECOND.particleRatio, {
				spread: CONFETTI_CONFIGS.SECOND.spread,
			})

			fire(CONFETTI_CONFIGS.THIRD.particleRatio, {
				spread: CONFETTI_CONFIGS.THIRD.spread,
				decay: CONFETTI_CONFIGS.THIRD.decay,
				scalar: CONFETTI_CONFIGS.THIRD.scalar,
			})

			fire(CONFETTI_CONFIGS.FOURTH.particleRatio, {
				spread: CONFETTI_CONFIGS.FOURTH.spread,
				startVelocity: CONFETTI_CONFIGS.FOURTH.startVelocity,
				decay: CONFETTI_CONFIGS.FOURTH.decay,
				scalar: CONFETTI_CONFIGS.FOURTH.scalar,
			})

			fire(CONFETTI_CONFIGS.FIFTH.particleRatio, {
				spread: CONFETTI_CONFIGS.FIFTH.spread,
				startVelocity: CONFETTI_CONFIGS.FIFTH.startVelocity,
			})
		},
	}
}
