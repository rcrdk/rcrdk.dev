import { keyframes } from '@stitches/react'

// fade
export const fadeIn = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
})

export const fadeOut = keyframes({
	from: {
		opacity: 1,
	},
	to: {
		opacity: 0,
	},
})

// scale
export const scaleIn = keyframes({
	from: {
		opacity: 0,
		transform: 'scale(0.85)',
	},
	to: {
		opacity: 1,
		transform: 'scale(1)',
	},
})
