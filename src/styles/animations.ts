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

// full slide
export const slideInFromLeft = keyframes({
	from: {
		transform: 'translate3d(-100%,0,0)',
	},
	to: {
		transform: 'translate3d(0,0,0)',
	},
})

export const slideOutToLeft = keyframes({
	from: {
		transform: 'translate3d(0,0,0)',
	},
	to: {
		transform: 'translate3d(-100%,0,0)',
	},
})

export const slideInFromRight = keyframes({
	from: {
		transform: 'translate3d(100%,0,0)',
	},
	to: {
		transform: 'translate3d(0,0,0)',
	},
})

export const slideOutToRight = keyframes({
	from: {
		transform: 'translate3d(0,0,0)',
	},
	to: {
		transform: 'translate3d(100%,0,0)',
	},
})

// short slide
export const shortSlideInFromTop = keyframes({
	from: {
		transform: 'translate3d(0,-1.5rem,0)',
	},
	to: {
		transform: 'translate3d(0,0,0)',
	},
})

export const shortSlideOutToTop = keyframes({
	from: {
		transform: 'translate3d(0,0,0)',
	},
	to: {
		transform: 'translate3d(0,-1.5rem,0)',
	},
})

export const shortSlideInFromBottom = keyframes({
	from: {
		transform: 'translate3d(0,1.5rem,0)',
	},
	to: {
		transform: 'translate3d(0,0,0)',
	},
})

export const shortSlideOutToBottom = keyframes({
	from: {
		transform: 'translate3d(0,0,0)',
	},
	to: {
		transform: 'translate3d(0,1.5rem,0)',
	},
})

export const shortSlideInFromLeft = keyframes({
	from: {
		transform: 'translate3d(-1.5rem,0,0)',
	},
	to: {
		transform: 'translate3d(0,0,0)',
	},
})

export const shortSlideOutToLeft = keyframes({
	from: {
		transform: 'translate3d(0,0,0)',
	},
	to: {
		transform: 'translate3d(-1.5rem,0,0)',
	},
})

// dropdown
export const dropdownIn = keyframes({
	from: {
		transform: 'translate3d(0,-0.5rem,0)',
		opacity: 0,
		boxShadow: '$popupInvisible',
	},
	to: {
		transform: 'translate3d(0,0,0)',
		opacity: 1,
		boxShadow: '$popupVisible',
	},
})

export const dropdownOut = keyframes({
	from: {
		transform: 'translate3d(0,0,0)',
		opacity: 1,
		boxShadow: '$popupVisible',
	},
	to: {
		transform: 'translate3d(0,-0.5rem,0)',
		opacity: 0,
		boxShadow: '$popupInvisible',
	},
})
