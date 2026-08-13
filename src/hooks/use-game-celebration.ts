'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useConfetti } from '@/hooks/use-confetti'
import { useSoundEffect } from '@/hooks/use-sound-effect'

const GAME_WIN_CONFETTI_DELAY = 1000

type UseGameCelebrationParams = {
	isGameCompleted: boolean
	showGameDialog: boolean
}

export function useGameCelebration({ isGameCompleted, showGameDialog }: UseGameCelebrationParams) {
	const { fireConfettiWithSound } = useConfetti()
	const { playSound } = useSoundEffect()

	const celebrateAgainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const clearConfettiTimersRef = useRef<VoidFunction | null>(null)

	const clearPendingCelebration = useCallback(() => {
		if (celebrateAgainTimerRef.current) clearTimeout(celebrateAgainTimerRef.current)
		clearConfettiTimersRef.current?.()
	}, [])

	const celebrateWin = useCallback(() => {
		playSound('game-tada')
		clearPendingCelebration()

		celebrateAgainTimerRef.current = setTimeout(() => {
			clearConfettiTimersRef.current = fireConfettiWithSound()
		}, GAME_WIN_CONFETTI_DELAY)
	}, [clearPendingCelebration, fireConfettiWithSound, playSound])

	useEffect(() => {
		if (!isGameCompleted || !showGameDialog) return

		celebrateWin()

		return clearPendingCelebration
	}, [celebrateWin, clearPendingCelebration, isGameCompleted, showGameDialog])

	return { celebrateWin }
}
