'use client'

import * as DialogComponent from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import useDetectBrowser from '@/hooks/use-browser'
import { cn } from '@/utils/tailwind-cn'

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>

interface DialogProps {
	open: boolean
	onOpenChange: VoidFunction
	mode: 'content' | 'game'
	children: React.ReactNode
	hasImageUnderClose?: boolean
	hasTetris?: boolean
}

export function Dialog({
	open,
	onOpenChange,
	mode,
	hasImageUnderClose = false,
	hasTetris = false,
	children,
}: Readonly<DialogProps>) {
	const browser = useDetectBrowser()
	const __ = useTranslations('Default')

	function onOpenAutoFocus(e: Event) {
		e.preventDefault()
	}

	function onPointerDownOutside(e: PointerDownOutsideEvent) {
		const isToast = e.target instanceof Element && e.target.closest('[data-sonner-toast]')
		if (isToast) e.preventDefault()
	}

	const isContentMode = mode === 'content'
	const isGameMode = mode === 'game'
	const isGameWithoutTetris = mode === 'game' && !hasTetris
	const isGameWithTetris = mode === 'game' && hasTetris

	return (
		<DialogComponent.Root open={open} onOpenChange={onOpenChange}>
			<DialogComponent.Portal>
				<DialogComponent.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[99] overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50">
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-10 sm:items-center sm:p-10 lg:p-10">
						<DialogComponent.Content
							className={cn(
								'data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all relative z-10 w-full rounded-3xl will-change-transform outline-none',
								isContentMode && 'max-w-[440px] border border-black/15 md:max-w-[540px] dark:border-white/20',
								isGameWithoutTetris && 'sm:max-w-[440px]',
								isGameWithTetris && 'sm:max-w-[490px]',
							)}
							onOpenAutoFocus={onOpenAutoFocus}
							onPointerDownOutside={onPointerDownOutside}
						>
							{isGameMode && (
								<div
									className={cn(
										'animate-glowing game-gradient absolute -inset-2 -z-10 block rounded-3xl [background-size:1000%]',
										browser !== 'Apple Safari' && 'blur-[120px]',
									)}
								/>
							)}

							<div
								className={cn(
									'shadow-dialog dark:shadow-dialog-inverted dark:bg-black" squircle-rounded-dialog relative z-10 rounded-3xl bg-white select-none dark:bg-black',
									isGameMode && 'xs:p-10 px-6 pt-10 pb-6 text-center text-balance',
								)}
							>
								<DialogComponent.Close
									className={cn(
										'focus-visible:ring-accent-blue/50 focus-visible:bg-accent-blue xs:top-6 xs:right-6 absolute top-4 right-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-xs transition-all outline-none focus-visible:text-white focus-visible:ring-4',
										hasImageUnderClose && 'bg-black/35 text-white hover:bg-black',
										!hasImageUnderClose &&
											'bg-black/5 text-black/35 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/25',
									)}
									aria-label={__('close')}
								>
									<IconX className="size-5" aria-hidden />
								</DialogComponent.Close>

								{children}
							</div>
						</DialogComponent.Content>
					</div>
				</DialogComponent.Overlay>
			</DialogComponent.Portal>
		</DialogComponent.Root>
	)
}
