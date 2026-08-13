'use client'

import { Content as CollapsibleContent, Root as CollapsibleRoot } from '@radix-ui/react-collapsible'
import { Description as DialogDescription, Title as DialogTitle } from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'

import { GameOptIn } from '@/components/game/dialog/opt-in'
import { GameScoreboard } from '@/components/game/dialog/scoreboard'
import { GameDialogWrapper } from '@/components/game/dialog/wrapper'
import { GameTaskItem } from '@/components/game/game-task-item'
import { Button } from '@/components/ui/button'
import { ANALYTICS_EVENTS } from '@/config/analytics-events'
import { useGame } from '@/hooks/use-game'
import { useGameCelebration } from '@/hooks/use-game-celebration'
import { trackEvent } from '@/lib/track-event'
import { cn } from '@/utils'

export function GameDialog() {
	const {
		showGameDialog,
		onShowGameDialog,
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

	const __ = useTranslations('Game')

	const { celebrateWin } = useGameCelebration({ isGameCompleted, showGameDialog })

	function handleCelebrateAgain() {
		trackEvent(ANALYTICS_EVENTS.gameCelebrateAgain, { points: pointsEarned })
		celebrateWin()
	}

	const shouldDisplayTasksTrigger = showGameDialog && !showGameTasks && !isGameCompleted
	const shouldDisplayTasks = (showGameDialog && showGameTasks) || isGameCompleted

	return (
		<GameDialogWrapper open={showGameDialog} onOpenChange={onShowGameDialog}>
			<span className="text-6xl">{isGameCompleted ? '🥇' : '🕹️'}</span>

			<DialogTitle className="mt-4 mb-3 block text-3xl font-bold tracking-tight text-black dark:text-white">
				{isGameCompleted ? __('winner.title') : __('title')}
			</DialogTitle>

			<DialogDescription className="dark:text-content-dark text-content-light text-base">
				{isGameCompleted ? __('winner.text') : __('text', { quantity: gameTasks.length })}
			</DialogDescription>

			{isGameCompleted && isGameActive && (
				<Button variant="outline-warning" className="mt-6 w-full font-semibold" onClick={handleCelebrateAgain} haptic>
					<span className="text-2xl">🎉</span>
					{__('winner.celebrateAgain')}
				</Button>
			)}

			{!isGameActive && <GameOptIn onActivateGame={onActivateGame} />}

			{isGameActive && (
				<>
					<GameScoreboard
						pointsEarned={pointsEarned}
						pointsTotal={pointsTotal}
						onStopGame={onStopGame}
						onResetGame={onResetGame}
					/>

					<div className="relative min-h-12">
						<Button
							variant="outline-warning"
							className={cn('absolute top-0 left-0 w-full', !shouldDisplayTasksTrigger && 'opacity-0 duration-100')}
							tabIndex={shouldDisplayTasksTrigger ? 0 : -1}
							onClick={(e) => {
								e.currentTarget.blur()
								onShowGameTasks()
							}}
							aria-label={__('ariaLabels.showTasks', { taskName: __('taskButtons.tetris') })}
							haptic
						>
							<span className="text-2xl">🫣</span>
							{__('button')}
						</Button>

						<CollapsibleRoot open={shouldDisplayTasks}>
							<CollapsibleContent className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out flex flex-col gap-4 overflow-hidden will-change-contents ![animation-duration:500ms]">
								{gameTasks.map((task) => (
									<GameTaskItem key={task.id} task={task} />
								))}
							</CollapsibleContent>
						</CollapsibleRoot>
					</div>
				</>
			)}
		</GameDialogWrapper>
	)
}
