'use client'

import { useCallback, useEffect } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Dialog from '@radix-ui/react-dialog'
import { IconRefresh, IconVolume, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { GameTaskItem } from '@/components/game/game-task-item'
import { Button } from '@/components/ui/button'
import useDetectBrowser from '@/hooks/use-browser'
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
	} = useGame()

	const __ = useTranslations('Default')
	const browser = useDetectBrowser()

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
		if (isGameCompleted && showGameModal) {
			triggerConfetti()
		}
	}, [triggerConfetti, isGameCompleted, showGameModal])

	const shouldDisplayTasksTrigger = showGameModal && !showGameTasks && !isGameCompleted
	const shouldDisplayTasks = (showGameModal && showGameTasks) || isGameCompleted

	return (
		<Dialog.Root open={showGameModal} onOpenChange={onShowGameModal}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[99] overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50">
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-20 sm:items-center sm:p-12 lg:p-20">
						<Dialog.Content
							className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all relative z-10 w-full will-change-transform outline-none sm:max-w-[440px]"
							onOpenAutoFocus={(e) => e.preventDefault()}
							onPointerDownOutside={(e) => {
								if (e.target instanceof Element && e.target.closest('[data-sonner-toast]')) {
									e.preventDefault()
								}
							}}
						>
							<div
								className={cn(
									'animate-glowing absolute -inset-2 -z-10 block rounded-3xl bg-[linear-gradient(45deg,_#ff0000,_#ff7300,_#fffb00,_#48ff00,_#00ffd5,_#002bff,_#7a00ff,_#ff00c8,_#ff0000)] [background-size:1000%]',
									browser !== 'Apple Safari' && 'blur-[120px]',
								)}
							/>

							<div className="shadow-dialog xs:p-10 relative z-10 rounded-3xl bg-white px-6 pt-10 pb-6 text-center text-balance select-none dark:bg-black">
								<Dialog.Close className="focus-visible:ring-accent-blue/50 focus-visible:border-accent-blue focus-visible:bg-accent-blue xs:top-6 xs:right-6 focus-visible:ring-4', absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/5 text-black/35 shadow-2xl backdrop-blur-xs transition-all outline-none hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/25">
									<IconX className="size-5" />
								</Dialog.Close>

								<span className="text-6xl">{isGameCompleted ? '🥇' : '🕹️'}</span>

								<Dialog.Title className="mt-4 mb-3 block text-3xl font-bold tracking-tight text-black dark:text-white">
									{isGameCompleted ? __('game.winner.title') : __('game.title')}
								</Dialog.Title>

								<Dialog.Description className="dark:text-content-dark text-content-light text-base">
									{isGameCompleted ? __('game.winner.text') : __('game.text')}
								</Dialog.Description>

								{!isGameActive && (
									<>
										<Button
											variant="outline-warning"
											className="mt-8 mb-6 w-full font-semibold"
											onClick={onActivateGame}
										>
											<span className="text-2xl">🤠</span>
											{__('game.optIn.button')}
										</Button>

										<p className="opacity-50c flex items-center justify-center gap-1 text-sm dark:opacity-80">
											<IconVolume className="stroke-1" />
											{__('game.optIn.sound')}
										</p>
									</>
								)}

								{isGameActive && (
									<>
										<div className="mt-6 mb-10 flex items-center justify-between rounded-2xl bg-black/5 px-5 py-3 dark:bg-white/10">
											<p className="p-1 text-sm text-black dark:text-white">
												<strong className="font-semibold">{__('game.score')}</strong> {pointsEarned}/{pointsTotal}
											</p>

											<button
												onClick={() => onResetGame()}
												disabled={pointsEarned === 0}
												className="focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue flex cursor-pointer items-center gap-1 rounded-lg p-1 text-sm font-medium transition-all outline-none hover:bg-black/5 focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/5"
											>
												<IconRefresh size={16} />
												{__('game.reset')}
											</button>
										</div>

										<div className="relative min-h-12">
											<Button
												variant="outline-warning"
												className={cn(
													'absolute top-0 left-0 w-full',
													!shouldDisplayTasksTrigger && 'opacity-0 duration-100',
												)}
												tabIndex={shouldDisplayTasksTrigger ? 0 : -1}
												onClick={(e) => {
													e.currentTarget.blur()
													onShowGameTasks()
												}}
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
							</div>
						</Dialog.Content>
					</div>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
