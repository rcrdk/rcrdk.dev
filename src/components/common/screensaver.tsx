'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useIdle, useMediaQuery } from 'react-haiku'

import { SCREENSAVER_GIFS } from '@/config/gifs'
import { SCREENSAVER_CONFIG } from '@/config/screensaver'
import { useDvdScreensaver } from '@/hooks/use-dvd-screensaver'
import { useGame } from '@/hooks/use-game'
import { useSoundEffect } from '@/hooks/use-sound-effect'
import { cn } from '@/utils/tailwind-cn'

const { TIMEOUT, GIF_CHANGE_DELAY, DVD_SPEED } = SCREENSAVER_CONFIG

const isDevelopment = process.env.NODE_ENV === 'development'

export function Screensaver() {
	const [gif, setGif] = useState(0)

	const isIddle = useIdle(TIMEOUT, { initialState: false })
	const isTouchDevice = useMediaQuery('(hover : none)', false)
	const __ = useTranslations('Default')

	const { onCompleteTask, showGameTetris, showGameModal, isGameActive } = useGame()
	const { containerRef, elementRef } = useDvdScreensaver({ speed: DVD_SPEED })
	const { playCricket, pauseCricket } = useSoundEffect()

	useEffect(() => {
		if (!isGameActive || isDevelopment || showGameTetris || showGameModal) return
		if (isIddle) playCricket()
		if (!isIddle) pauseCricket()
	}, [isIddle, playCricket, pauseCricket, isGameActive, showGameTetris, showGameModal])

	useEffect(() => {
		const random = Math.floor(Math.random() * SCREENSAVER_GIFS.length)

		let timer: NodeJS.Timeout

		if (!isIddle) timer = setTimeout(() => setGif(random), GIF_CHANGE_DELAY)

		if (isIddle)
			timer = setTimeout(() => {
				setGif(random)
				if (!showGameTetris && !showGameModal) onCompleteTask('screensaver')
			}, GIF_CHANGE_DELAY)

		return () => clearTimeout(timer)
	}, [isIddle, onCompleteTask, showGameTetris, showGameModal])

	if (isTouchDevice || process.env.NODE_ENV === 'development' || showGameTetris || showGameModal) return null

	return (
		<div
			ref={containerRef}
			className={cn(
				'fixed inset-0 !z-99999999 bg-white transition-opacity duration-700 dark:bg-black',
				isIddle && 'opacity-100',
				!isIddle && 'pointer-events-none opacity-0',
			)}
		>
			<h1 className="font-heading xs:text-7xl absolute inset-0 flex items-center justify-center p-16 text-center text-6xl font-black tracking-tighter text-balance md:text-8xl lg:text-9xl dark:text-white">
				{__('screensaver')}
			</h1>

			<div ref={elementRef} className="relative size-48 overflow-hidden rounded-xl sm:size-64 lg:size-80">
				<img
					src={SCREENSAVER_GIFS[gif]}
					alt="Decorative screensaver animation"
					className="absolute inset-0 size-full object-cover object-center"
				/>
			</div>
		</div>
	)
}
