'use client'

import dynamic from 'next/dynamic'
import { Close as DialogClose, Description as DialogDescription, Title as DialogTitle } from '@radix-ui/react-dialog'
import { IconPlayerPlay, IconRotateClockwise2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { TetrisInstructions } from '@/components/game/dialog/tetris-instructions'
import { TetrisStatus } from '@/components/game/dialog/tetris-status'
import { GameDialogWrapper } from '@/components/game/dialog/wrapper'
import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'

const DynamicTetris = dynamic(() => import('react-tetris'), { ssr: false })

const SCORE_PAD_LENGTH = 4

const padScore = (value: number) => String(value).padStart(SCORE_PAD_LENGTH, '0')

export function GameDialogTetris() {
	const { showGameTetris, onShowGameTetris } = useGame()

	const __ = useTranslations('Game')

	return (
		<GameDialogWrapper open={showGameTetris} onOpenChange={onShowGameTetris} hasTetris>
			<div className="sr-only">
				<DialogTitle>{__('tetris.title')}</DialogTitle>
				<DialogDescription>{__('tetris.title')}</DialogDescription>
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

										<TetrisInstructions />
									</div>
								</div>

								<div className="pe-6 text-end">
									<p className="font-mono text-black dark:text-white">
										{__('tetris.points')}: {padScore(points)}
									</p>

									<p className="font-mono text-black dark:text-white">
										{__('tetris.lines')}: {padScore(linesCleared)}
									</p>
								</div>
							</div>

							<div className="relative aspect-auto">
								<div className="flex items-start justify-between">
									<HeldPiece />
									<Gameboard />
									<PieceQueue />
								</div>

								{state === 'LOST' && (
									<TetrisStatus
										emoji="😵"
										title={__('tetris.game_over.title')}
										text={__('tetris.game_over.text')}
										buttonLabel={__('tetris.game_over.button')}
										icon={<IconRotateClockwise2 className="size-5 stroke-[1.5]" aria-hidden />}
										onAction={() => controller.restart()}
									/>
								)}

								{state === 'PAUSED' && (
									<TetrisStatus
										emoji="☕️"
										title={__('tetris.game_paused.title')}
										text={__('tetris.game_paused.text')}
										buttonLabel={__('tetris.game_paused.button')}
										icon={<IconPlayerPlay className="size-5 stroke-[1.5]" aria-hidden />}
										onAction={() => controller.resume()}
									/>
								)}
							</div>
						</div>
					)}
				</DynamicTetris>
			</div>

			<div className="flex flex-col gap-4 text-center sm:hidden">
				<span className="text-6xl">🖥️</span>
				<strong className="text-2xl">{__('tetris.too_small.title')}</strong>

				<DialogClose asChild>
					<Button variant="outline" className="font-medium">
						{__('tetris.too_small.button')}
					</Button>
				</DialogClose>
			</div>
		</GameDialogWrapper>
	)
}
