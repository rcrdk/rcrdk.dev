'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import * as Dialog from '@radix-ui/react-dialog'
import { IconRefresh } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

export function GameModal() {
	const {
		showGameModal,
		onShowGameModal,
		pointsEarned,
		pointsTotal,
		gameTasks,
		onResetGame,
		onShowGameTasks,
		showGameTasks,
	} = useGame()

	const __ = useTranslations('Default')

	return (
		<Dialog.Root open={showGameModal} onOpenChange={onShowGameModal}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[99] overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50">
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-20 sm:items-center sm:p-12 lg:p-20">
						<Dialog.Content
							className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all relative z-10 w-full will-change-transform outline-none sm:max-w-[440px] dark:bg-black"
							onOpenAutoFocus={(e) => e.preventDefault()}
						>
							<div className="animate-glowing absolute -inset-2 -z-10 block rounded-3xl bg-[linear-gradient(45deg,_#ff0000,_#ff7300,_#fffb00,_#48ff00,_#00ffd5,_#002bff,_#7a00ff,_#ff00c8,_#ff0000)] [background-size:1000%] blur-3xl" />

							<div className="shadow-dialog xs:p-10 relative z-10 rounded-3xl bg-white px-6 pt-10 pb-6 text-center text-balance select-none dark:bg-black">
								<span className="text-6xl">🕹️</span>

								<Dialog.Title className="mt-4 mb-3 block text-3xl font-bold tracking-tight text-black dark:text-white">
									{__('game.title')}
								</Dialog.Title>

								<p className="dark:text-content-dark text-content-light text-base">{__('game.text')}</p>

								<div className="mt-6 mb-10 flex items-center justify-between rounded-2xl bg-black/5 px-5 py-3 dark:bg-white/10">
									<p className="p-1 text-sm text-black dark:text-white">
										<strong className="font-semibold">{__('game.score')}</strong> {pointsEarned}/{pointsTotal}
									</p>

									<button
										onClick={() => onResetGame()}
										disabled={pointsEarned === 0}
										className="focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue flex cursor-pointer items-center gap-1 rounded-lg p-1 text-sm font-medium transition-all outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-35"
									>
										<IconRefresh size={16} />
										{__('game.reset')}
									</button>
								</div>

								<Collapsible.Root open={showGameModal && !showGameTasks}>
									<Collapsible.Content className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden ![animation-duration:500ms]">
										<Button variant="outline-warning" className="w-full" onClick={() => onShowGameTasks()}>
											<span className="text-xl">🫣</span>
											{__('game.button')}
										</Button>
									</Collapsible.Content>
								</Collapsible.Root>

								<Collapsible.Root open={showGameModal && showGameTasks}>
									<Collapsible.Content className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden ![animation-duration:500ms]">
										{gameTasks.map((task) => (
											// TODO
											<p key={task.id}>
												<strong>{task.id}</strong>: {task.completed ? '✅' : '🛑'}
											</p>
										))}
									</Collapsible.Content>
								</Collapsible.Root>
							</div>
						</Dialog.Content>
					</div>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
