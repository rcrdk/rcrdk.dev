'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'

import { useGame } from '@/hooks/use-game'

export function GameModal() {
	const { showGameHistory, onShowGameHistory, pointsEarned, pointsTotal, gameTasks } = useGame()

	const __ = useTranslations('Default')

	return (
		<Dialog.Root open={showGameHistory} onOpenChange={onShowGameHistory}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[99] overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50">
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-20 sm:items-center sm:p-12 lg:p-20">
						<Dialog.Content
							className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all shadow-dialog relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-black/15 bg-white will-change-transform outline-none md:max-w-[540px] dark:border-white/20 dark:bg-black"
							onOpenAutoFocus={(e) => e.preventDefault()}
						>
							<div className="flex flex-col gap-6 p-10">
								<Dialog.Title className="text-2xl font-bold">
									{__('game.modalTitle')}
									<small className="ml-1 text-base font-normal opacity-65">
										({pointsEarned}/{pointsTotal})
									</small>
								</Dialog.Title>

								{/* To-do */}
								<pre className="text-sm leading-none">{JSON.stringify(gameTasks, null, 2)}</pre>
							</div>
						</Dialog.Content>
					</div>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
