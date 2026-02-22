const DEFAULT_SPRING_CONFIG = {
	stiffness: 180,
	damping: 28,
	mass: 0.6,
} as const

export const DEFAULT_MOTION_SPRING_CONFIG = {
	type: 'spring',
	...DEFAULT_SPRING_CONFIG,
} as const

export const DEFAULT_MOTION_TWEEN_CONFIG = {
	type: 'tween',
	...DEFAULT_SPRING_CONFIG,
} as const
