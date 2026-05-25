'use client'

import dynamic from 'next/dynamic'

import { useGame } from '@/hooks/use-game'
import { useLazyMount } from '@/hooks/use-lazy-mount'

const GameDialog = dynamic(
	() => import('@/components/game/dialog').then((module) => ({ default: module.GameDialog })),
	{ ssr: false },
)

export function LazyGameDialog() {
	const { showGameDialog } = useGame()
	const shouldMount = useLazyMount(showGameDialog)

	if (!shouldMount) return null

	return <GameDialog />
}
