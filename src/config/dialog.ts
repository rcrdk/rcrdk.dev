export const FULLSCREEN_EASE = [0.16, 1, 0.3, 1] as const
export const FULLSCREEN_ENTER_DURATION_S = 1.2
export const FULLSCREEN_EXIT_DURATION_S = 0.8
export const FULLSCREEN_CLOSE_ENTER_DELAY_S = 0.15

export const dialogCloseMotionProps = {
	initial: { opacity: 0, scale: 0.85 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: FULLSCREEN_ENTER_DURATION_S,
			ease: FULLSCREEN_EASE,
			delay: FULLSCREEN_CLOSE_ENTER_DELAY_S,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.85,
		transition: { duration: FULLSCREEN_EXIT_DURATION_S, ease: FULLSCREEN_EASE },
	},
}

export const dialogCloseButtonClassName =
	'focus-visible:ring-accent-blue/50 focus-visible:bg-accent-blue pointer-events-auto flex size-12 cursor-pointer items-center justify-center rounded-full backdrop-blur-xs transition-all outline-none focus-visible:text-white focus-visible:ring-4 bg-black/5 text-black/35 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/25'

export const dialogInlineCloseButtonClassName =
	'focus-visible:ring-accent-blue/50 focus-visible:bg-accent-blue xs:top-6 xs:right-6 absolute top-4 right-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-xs transition-all outline-none focus-visible:text-white focus-visible:ring-4 bg-black/5 text-black/35 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/25'

export const getDialogOverlayBaseClassName = (disableTheme = false) =>
	disableTheme ? 'disable-themes text-content-light' : ''
