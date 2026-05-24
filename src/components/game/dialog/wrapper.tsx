'use client'

import { useEffect, type ReactNode } from 'react'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { dialogInlineCloseButtonClassName } from '@/config/dialog'
import useDetectBrowser from '@/hooks/use-browser'
import { onDialogOpenAutoFocus, onDialogPointerDownOutside } from '@/utils/dialog'
import { cn } from '@/utils/tailwind-cn'

interface GameDialogWrapperProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: ReactNode
	hasTetris?: boolean
	ariaDescribedby?: string
}

export function GameDialogWrapper({
	open,
	onOpenChange,
	children,
	hasTetris = false,
	ariaDescribedby,
}: Readonly<GameDialogWrapperProps>) {
	const browser = useDetectBrowser()
	const __ = useTranslations('Default')

	useEffect(() => {
		if (!open || !hasTetris) return

		const gameKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Space'])

		function onKeyDown(event: KeyboardEvent) {
			if (!gameKeys.has(event.key)) return
			event.preventDefault()
		}

		window.addEventListener('keydown', onKeyDown, { capture: true })

		return () => window.removeEventListener('keydown', onKeyDown, { capture: true })
	}, [open, hasTetris])

	const overlayClassName =
		'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-99 overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50'

	const contentClassName = cn(
		'data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all squircle-rounded-dialog relative z-10 w-full rounded-3xl will-change-transform outline-none',
		hasTetris ? 'sm:max-w-[490px]' : 'sm:max-w-[440px]',
	)

	return (
		<DialogComponent.Root open={open} onOpenChange={onOpenChange}>
			<DialogComponent.Portal>
				<DialogComponent.Overlay className={overlayClassName}>
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-10 sm:items-center sm:p-10 lg:p-10">
						<DialogComponent.Content
							className={contentClassName}
							onOpenAutoFocus={onDialogOpenAutoFocus}
							onPointerDownOutside={onDialogPointerDownOutside}
							aria-describedby={ariaDescribedby}
						>
							<div
								className={cn(
									'animate-glowing game-gradient absolute -inset-2 -z-10 block rounded-3xl [background-size:1000%]',
									browser !== 'Apple Safari' && 'blur-[120px]',
								)}
							/>

							<div className="shadow-dialog dark:shadow-dialog-inverted squircle-rounded-dialog xs:p-10 relative z-10 rounded-3xl bg-white px-6 pt-10 pb-6 text-center text-balance select-none dark:bg-black">
								<DialogComponent.Close className={dialogInlineCloseButtonClassName} aria-label={__('close')}>
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
