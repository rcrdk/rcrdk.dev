'use client'

import { type ReactNode } from 'react'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { dialogInlineCloseButtonClassName, getDialogOverlayBaseClassName } from '@/config/dialog'
import { onDialogOpenAutoFocus, onDialogPointerDownOutside } from '@/utils/dialog'
import { cn } from '@/utils/tailwind-cn'

interface DialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: ReactNode
	disableTheme?: boolean
	ariaDescribedby?: string
}

export function Dialog({ open, onOpenChange, children, disableTheme = false, ariaDescribedby }: Readonly<DialogProps>) {
	const __ = useTranslations('Default')

	const overlayClassName = cn(
		'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-99 overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50',
		getDialogOverlayBaseClassName(disableTheme),
	)

	return (
		<DialogComponent.Root open={open} onOpenChange={onOpenChange}>
			<DialogComponent.Portal>
				<DialogComponent.Overlay className={overlayClassName}>
					<div className="xs:p-4 pointer-events-none flex min-h-full items-end justify-center p-3 max-sm:pt-10 sm:items-center sm:p-10 lg:p-10">
						<DialogComponent.Content
							className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all squircle-rounded-dialog relative z-10 w-full max-w-[440px] rounded-3xl border border-black/15 will-change-transform outline-none md:max-w-[540px] dark:border-white/20"
							onOpenAutoFocus={onDialogOpenAutoFocus}
							onPointerDownOutside={onDialogPointerDownOutside}
							aria-describedby={ariaDescribedby}
						>
							<div className="shadow-dialog dark:shadow-dialog-inverted squircle-rounded-dialog relative z-10 rounded-3xl bg-white select-none dark:bg-black">
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
