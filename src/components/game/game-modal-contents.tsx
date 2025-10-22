'use client'

import { useCallback, useEffect } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as DialogRadix from '@radix-ui/react-dialog'
import { IconRefresh, IconSkull, IconVolume } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { GameTaskItem } from '@/components/game/game-task-item'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useConfetti } from '@/hooks/use-confetti'
import { useGame } from '@/hooks/use-game'
import { env } from '@/lib/env'
import { cn } from '@/utils/tailwind-cn'

export function GameModalContents() {
	const {
		showGameModal,
		onShowGameModal,
		pointsEarned,
		pointsTotal,
		gameTasks,
		onResetGame,
		onShowGameTasks,
		showGameTasks,
		isGameCompleted,
		isGameActive,
		onActivateGame,
		onStopGame,
	} = useGame()

	const __ = useTranslations('Default')

	const { fireConfetti } = useConfetti()

	const triggerConfetti = useCallback(() => {
		fireConfetti()
		new Audio(`${env.NEXT_PUBLIC_APP_URL}/audio/confetti-pop.mp3`).play()

		const timer1 = setTimeout(() => {
			fireConfetti()
			new Audio(`${env.NEXT_PUBLIC_APP_URL}/audio/confetti-pop.mp3`).play()
		}, 750)

		const timer2 = setTimeout(() => {
			fireConfetti()
			new Audio(`${env.NEXT_PUBLIC_APP_URL}/audio/confetti-pop.mp3`).play()
		}, 1500)

		return () => {
			clearTimeout(timer1)
			clearTimeout(timer2)
		}
	}, [fireConfetti])

	useEffect(() => {
		if (isGameCompleted && showGameModal) triggerConfetti()
	}, [triggerConfetti, isGameCompleted, showGameModal])

	const shouldDisplayTasksTrigger = showGameModal && !showGameTasks && !isGameCompleted
	const shouldDisplayTasks = (showGameModal && showGameTasks) || isGameCompleted

	return (
		<Dialog open={showGameModal} onOpenChange={onShowGameModal} mode="game">
			<span className="text-6xl">{isGameCompleted ? '🥇' : '🕹️'}</span>

			<DialogRadix.Title className="mt-4 mb-3 block text-3xl font-bold tracking-tight text-black dark:text-white">
				{isGameCompleted ? __('game.winner.title') : __('game.title')}
			</DialogRadix.Title>

			<DialogRadix.Description className="dark:text-content-dark text-content-light text-base">
				{isGameCompleted ? __('game.winner.text') : __('game.text', { quantity: gameTasks.length })}
			</DialogRadix.Description>

			{!isGameActive && (
				<>
					<Button
						variant="outline-warning"
						className="mt-8 mb-6 w-full font-semibold"
						onClick={onActivateGame}
						aria-describedby="game-sound-note"
					>
						<span className="text-2xl">🤠</span>
						{__('game.optIn.button')}
					</Button>

					<p id="game-sound-note" className="flex items-center justify-center gap-1 text-sm opacity-50 dark:opacity-80">
						<IconVolume className="stroke-1" aria-hidden />
						{__('game.optIn.sound')}
					</p>
				</>
			)}

			{isGameActive && (
				<>
					<div className="mt-6 mb-10 flex items-center gap-1 rounded-2xl bg-black/5 py-3 pr-4 pl-5 dark:bg-white/10">
						<p className="grow p-1 text-start text-sm text-black dark:text-white">
							<strong className="font-semibold">{__('game.score')}</strong> {pointsEarned}/{pointsTotal}
						</p>

						<button
							onClick={onStopGame}
							className="focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue flex cursor-pointer items-center gap-1 rounded-lg p-1 text-sm font-medium transition-all outline-none hover:bg-black/5 focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/5"
							aria-label={__('game.ariaLabels.stopGame')}
						>
							<IconSkull size={16} aria-hidden />
							{__('game.stop')}
						</button>

						<button
							onClick={onResetGame}
							disabled={pointsEarned === 0}
							className="focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue flex cursor-pointer items-center gap-1 rounded-lg p-1 text-sm font-medium transition-all outline-none hover:bg-black/5 focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/5"
							aria-label={__('game.ariaLabels.resetGame')}
						>
							<IconRefresh size={16} aria-hidden />
							{__('game.reset')}
						</button>
					</div>

					<div className="relative min-h-12">
						<Button
							variant="outline-warning"
							className={cn('absolute top-0 left-0 w-full', !shouldDisplayTasksTrigger && 'opacity-0 duration-100')}
							tabIndex={shouldDisplayTasksTrigger ? 0 : -1}
							onClick={(e) => {
								e.currentTarget.blur()
								onShowGameTasks()
							}}
							aria-label={__('game.ariaLabels.showTasks', { taskName: __('game.taskButtons.tetris') })}
						>
							<span className="text-2xl">🫣</span>
							{__('game.button')}
						</Button>

						<Collapsible.Root open={shouldDisplayTasks}>
							<Collapsible.Content className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out flex flex-col gap-4 overflow-hidden will-change-contents ![animation-duration:500ms]">
								{gameTasks.map((task) => (
									<GameTaskItem key={task.id} task={task} />
								))}
							</Collapsible.Content>
						</Collapsible.Root>
					</div>
				</>
			)}
		</Dialog>
	)
}
