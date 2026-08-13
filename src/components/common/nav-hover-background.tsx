'use client'

import { AnimatePresence } from 'motion/react'

import { MotionDiv } from '@/components/animated/motion'
import { DEFAULT_MOTION_SPRING_CONFIG } from '@/config/motion'
import type { RelativeRect } from '@/hooks/use-relative-rect'

interface NavHoverBackgroundProps {
	rect: RelativeRect
}

export function NavHoverBackground({ rect }: Readonly<NavHoverBackgroundProps>) {
	const position = rect && { left: rect.left, top: rect.top, width: rect.width, height: rect.height }

	return (
		<AnimatePresence>
			{position && (
				<MotionDiv
					className="squircle-rounded pointer-events-none absolute z-0 rounded-2xl border border-black/15 bg-white dark:border-white/15 dark:bg-white/20"
					transition={DEFAULT_MOTION_SPRING_CONFIG}
					initial={{ opacity: 0, ...position }}
					animate={{ opacity: 1, ...position }}
					exit={{ opacity: 0 }}
				/>
			)}
		</AnimatePresence>
	)
}
