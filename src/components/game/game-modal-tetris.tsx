'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as HoverCard from '@radix-ui/react-hover-card'
import { IconHelpCircle, IconPlayerPlay, IconRotateClockwise2, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Tetris from 'react-tetris'

import { Button } from '@/components/ui/button'
import useDetectBrowser from '@/hooks/use-browser'
import { useGame } from '@/hooks/use-game'
import { cn } from '@/utils/tailwind-cn'

export function GameModalTetris() {
	const { showGameTetris, onShowGameTetris } = useGame()

	const __ = useTranslations('Default')
	const browser = useDetectBrowser()

	return (
		<Dialog.Root open={showGameTetris} onOpenChange={onShowGameTetris}>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[99] overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50">
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-10 sm:items-center sm:p-10 lg:p-10">
						<Dialog.Content
							className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all relative z-10 w-full will-change-transform outline-none sm:max-w-[490px]"
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

								<Tetris>
									{({ HeldPiece, Gameboard, PieceQueue, points, linesCleared, state, controller }) => (
										<div className="hidden sm:block">
											<div className="mb-6 flex items-center justify-between">
												<div className="flex items-center gap-2">
													<span className="block text-6xl">👾</span>

													<div>
														<Dialog.Title className="mb-1 flex items-center gap-2 font-mono text-2xl leading-none font-black tracking-tighter text-black dark:text-white">
															{__('game.tetris.title')}
														</Dialog.Title>

														<Dialog.Description className="sr-only">{__('game.tetris.title')}</Dialog.Description>

														<HoverCard.Root openDelay={0}>
															<HoverCard.Trigger className="flex cursor-help items-center gap-0.5 text-sm font-medium text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
																<IconHelpCircle className="size-4" />
																{__('game.tetris.instructions.popover')}
															</HoverCard.Trigger>

															<HoverCard.Content
																className="dark:bg-dropdown-dark z-50 flex flex-col gap-1 rounded-xl border border-black/20 bg-white p-6 text-start text-sm shadow-2xl dark:border-white/20"
																side="bottom"
																align="start"
																sideOffset={8}
															>
																<p>
																	<kbd>Shift</kbd> {__('game.tetris.instructions.or')} <kbd>C</kbd>:{' '}
																	{__('game.tetris.instructions.hold')}
																</p>

																<p>
																	<kbd>P</kbd>: {__('game.tetris.instructions.status')}
																</p>

																<p>
																	<kbd>↓</kbd>: {__('game.tetris.instructions.move_down')}
																</p>

																<p>
																	<kbd>←</kbd>: {__('game.tetris.instructions.move_left')}
																</p>

																<p>
																	<kbd>→</kbd>: {__('game.tetris.instructions.move_right')}
																</p>

																<p>
																	<kbd>Space</kbd>: {__('game.tetris.instructions.hard_drop')}
																</p>

																<p>
																	<kbd>z</kbd>: {__('game.tetris.instructions.flip_counterclockwise')}
																</p>

																<p>
																	<kbd>x</kbd> {__('game.tetris.instructions.or')} <kbd>↑</kbd>:{' '}
																	{__('game.tetris.instructions.flip_clockwise')}
																</p>
															</HoverCard.Content>
														</HoverCard.Root>
													</div>
												</div>

												<div className="pe-6 text-end">
													<p className="font-mono text-black dark:text-white">
														{__('game.tetris.points')}: {String(points).padStart(4, '0')}
													</p>

													<p className="font-mono text-black dark:text-white">
														{__('game.tetris.lines')}: {String(linesCleared).padStart(4, '0')}
													</p>
												</div>
											</div>

											<div className="relative">
												<div className="flex items-start justify-between">
													<HeldPiece />
													<Gameboard />
													<PieceQueue />
												</div>

												{state !== 'PLAYING' && (
													<div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50">
														<div className="dark:bg-dropdown-dark flex w-9/12 flex-col items-center justify-center rounded-xl border border-black/20 bg-white p-6 text-center shadow-2xl dark:border-white/20">
															{state === 'LOST' && (
																<>
																	<span className="text-5xl">😵</span>
																	<strong className="text-xl text-black dark:text-white">
																		{__('game.tetris.game_over.title')}
																	</strong>
																	<span className="mt-1 mb-4 text-balance">{__('game.tetris.game_over.text')}</span>
																	<Button
																		variant="solid"
																		size="sm"
																		className="font-medium"
																		onClick={() => controller.restart()}
																	>
																		<IconRotateClockwise2 className="size-5 stroke-[1.5]" />
																		{__('game.tetris.game_over.button')}
																	</Button>
																</>
															)}

															{state === 'PAUSED' && (
																<>
																	<span className="text-5xl">☕️</span>
																	<strong className="text-xl text-black dark:text-white">
																		{__('game.tetris.game_paused.title')}
																	</strong>
																	<span className="mt-1 mb-4 text-balance">{__('game.tetris.game_paused.text')}</span>
																	<Button
																		variant="solid"
																		size="sm"
																		className="font-medium"
																		onClick={() => controller.resume()}
																	>
																		<IconPlayerPlay className="size-5 stroke-[1.5]" />
																		{__('game.tetris.game_paused.button')}
																	</Button>
																</>
															)}
														</div>
													</div>
												)}
											</div>
										</div>
									)}
								</Tetris>

								<div className="flex flex-col gap-4 text-center sm:hidden">
									<span className="text-6xl">🖥️</span>
									<strong className="text-2xl">{__('game.tetris.too_small.title')}</strong>

									<Dialog.Close asChild>
										<Button variant="outline" className="font-medium">
											{__('game.tetris.too_small.button')}
										</Button>
									</Dialog.Close>
								</div>
							</div>
						</Dialog.Content>
					</div>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
