'use client'

import dynamic from 'next/dynamic'
import * as DialogRadix from '@radix-ui/react-dialog'
import * as HoverCard from '@radix-ui/react-hover-card'
import { IconHelpCircle, IconPlayerPlay, IconRotateClockwise2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useGame } from '@/hooks/use-game'

const DynamicTetris = dynamic(() => import('react-tetris'), { ssr: false })

export function GameModalTetris() {
	const { showGameTetris, onShowGameTetris } = useGame()

	const __ = useTranslations('Game')

	return (
		<Dialog open={showGameTetris} onOpenChange={onShowGameTetris} mode="game" hasTetris>
			<div className="sr-only">
				<DialogRadix.Title>{__('tetris.title')}</DialogRadix.Title>
				<DialogRadix.Description>{__('tetris.title')}</DialogRadix.Description>
			</div>

			<div className="sm:min-h-[485px]">
				<DynamicTetris>
					{({ HeldPiece, Gameboard, PieceQueue, points, linesCleared, state, controller }) => (
						<div className="hidden sm:block">
							<div className="mb-6 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="block text-6xl">👾</span>

									<div>
										<strong className="mb-1 flex items-center gap-2 font-mono text-2xl leading-none font-black tracking-tighter text-black dark:text-white">
											{__('tetris.title')}
										</strong>

										<HoverCard.Root openDelay={0}>
											<HoverCard.Trigger className="flex cursor-help items-center gap-0.5 text-sm font-medium text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
												<IconHelpCircle className="size-4" aria-hidden />
												{__('tetris.instructions.popover')}
											</HoverCard.Trigger>

											<HoverCard.Content
												className="dark:bg-dropdown-dark z-50 flex flex-col gap-1 rounded-xl border border-black/20 bg-white p-6 text-start text-sm shadow-2xl dark:border-white/20"
												side="bottom"
												align="start"
												sideOffset={8}
											>
												<p>
													<kbd>Shift</kbd> {__('tetris.instructions.or')} <kbd>C</kbd>: {__('tetris.instructions.hold')}
												</p>

												<p>
													<kbd>P</kbd>: {__('tetris.instructions.status')}
												</p>

												<p>
													<kbd>↓</kbd>: {__('tetris.instructions.move_down')}
												</p>

												<p>
													<kbd>←</kbd>: {__('tetris.instructions.move_left')}
												</p>

												<p>
													<kbd>→</kbd>: {__('tetris.instructions.move_right')}
												</p>

												<p>
													<kbd>Space</kbd>: {__('tetris.instructions.hard_drop')}
												</p>

												<p>
													<kbd>z</kbd>: {__('tetris.instructions.flip_counterclockwise')}
												</p>

												<p>
													<kbd>x</kbd> {__('tetris.instructions.or')} <kbd>↑</kbd>:{' '}
													{__('tetris.instructions.flip_clockwise')}
												</p>
											</HoverCard.Content>
										</HoverCard.Root>
									</div>
								</div>

								<div className="pe-6 text-end">
									<p className="font-mono text-black dark:text-white">
										{__('tetris.points')}: {String(points).padStart(4, '0')}
									</p>

									<p className="font-mono text-black dark:text-white">
										{__('tetris.lines')}: {String(linesCleared).padStart(4, '0')}
									</p>
								</div>
							</div>

							<div className="relative aspect-auto">
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
													<strong className="text-xl text-black dark:text-white">{__('tetris.game_over.title')}</strong>
													<span className="mt-1 mb-4 text-balance">{__('tetris.game_over.text')}</span>
													<Button
														variant="solid"
														size="sm"
														className="font-medium"
														onClick={() => controller.restart()}
													>
														<IconRotateClockwise2 className="size-5 stroke-[1.5]" aria-hidden />
														{__('tetris.game_over.button')}
													</Button>
												</>
											)}

											{state === 'PAUSED' && (
												<>
													<span className="text-5xl">☕️</span>
													<strong className="text-xl text-black dark:text-white">
														{__('tetris.game_paused.title')}
													</strong>
													<span className="mt-1 mb-4 text-balance">{__('tetris.game_paused.text')}</span>
													<Button variant="solid" size="sm" className="font-medium" onClick={() => controller.resume()}>
														<IconPlayerPlay className="size-5 stroke-[1.5]" aria-hidden />
														{__('tetris.game_paused.button')}
													</Button>
												</>
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</DynamicTetris>
			</div>

			<div className="flex flex-col gap-4 text-center sm:hidden">
				<span className="text-6xl">🖥️</span>
				<strong className="text-2xl">{__('tetris.too_small.title')}</strong>

				<DialogRadix.Close asChild>
					<Button variant="outline" className="font-medium">
						{__('tetris.too_small.button')}
					</Button>
				</DialogRadix.Close>
			</div>
		</Dialog>
	)
}
