'use client'

import dynamic from 'next/dynamic'

import { useGame } from '@/hooks/use-game'
import { useLazyMount } from '@/hooks/use-lazy-mount'

const GameDialogTetris = dynamic(
	() => import('@/components/game/dialog/tetris').then((module) => ({ default: module.GameDialogTetris })),
	{ ssr: false },
)

export function LazyGameDialogTetris() {
	const { showGameTetris } = useGame()
	const shouldMount = useLazyMount(showGameTetris)

	if (!shouldMount) return null

	return <GameDialogTetris />
}
