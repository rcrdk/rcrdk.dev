'use client'

import { type ReactNode } from 'react'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/components/animated/motion'
import { dialogCloseButtonClassName, dialogCloseMotionProps, getDialogOverlayBaseClassName } from '@/config/dialog'
import { onDialogOpenAutoFocus, onDialogPointerDownOutside } from '@/utils/dialog'
import { cn } from '@/utils/tailwind-cn'

interface LayoutProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: ReactNode
	contentClassName: string
	disableTheme?: boolean
	ariaDescribedby?: string
}

export function Layout({
	open,
	onOpenChange,
	children,
	contentClassName,
	disableTheme = false,
	ariaDescribedby,
}: Readonly<LayoutProps>) {
	const __ = useTranslations('Default')

	return (
		<DialogComponent.Root open={open} onOpenChange={onOpenChange}>
			<DialogComponent.Portal>
				<DialogComponent.Overlay
					className={cn(
						'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-99 overflow-x-hidden overflow-y-auto scroll-smooth bg-white/50 backdrop-blur-xs dark:bg-black/50',
						getDialogOverlayBaseClassName(disableTheme),
					)}
				>
					<AnimatePresence>
						{open && (
							<MotionDiv
								key="project-dialog-close"
								className="layout:h-30 pointer-events-none absolute top-0 left-0 z-10 flex h-26 w-screen items-center justify-center"
								{...dialogCloseMotionProps}
							>
								<DialogComponent.Close className={dialogCloseButtonClassName} aria-label={__('close')}>
									<IconX className="size-7" aria-hidden />
								</DialogComponent.Close>
							</MotionDiv>
						)}
					</AnimatePresence>

					<div className="layout:pt-30 pointer-events-none flex min-h-full items-end justify-center pt-26">
						<DialogComponent.Content
							className={cn(
								'data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all squircle-rounded-dialog relative z-10 w-full rounded-3xl !rounded-b-none border-x border-t border-black/15 will-change-transform outline-none dark:border-white/20',
								contentClassName,
							)}
							onOpenAutoFocus={onDialogOpenAutoFocus}
							onPointerDownOutside={onDialogPointerDownOutside}
							aria-describedby={ariaDescribedby}
						>
							<div className="shadow-dialog dark:shadow-dialog-inverted squircle-rounded-dialog relative z-10 rounded-3xl !rounded-b-none bg-white select-none dark:bg-black">
								{children}
							</div>
						</DialogComponent.Content>
					</div>
				</DialogComponent.Overlay>
			</DialogComponent.Portal>
		</DialogComponent.Root>
	)
}
