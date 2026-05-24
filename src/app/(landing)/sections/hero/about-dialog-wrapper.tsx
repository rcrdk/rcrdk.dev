'use client'

import { useEffect, useState, type ReactNode } from 'react'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/components/animated/motion'
import {
	dialogCloseButtonClassName,
	dialogCloseMotionProps,
	FULLSCREEN_EASE,
	FULLSCREEN_ENTER_DURATION_S,
	FULLSCREEN_EXIT_DURATION_S,
	getDialogOverlayBaseClassName,
} from '@/config/dialog'
import { onDialogOpenAutoFocus, onDialogPointerDownOutside } from '@/utils/dialog'
import { cn } from '@/utils/tailwind-cn'

interface AboutDialogWrapperProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: ReactNode
	disableTheme?: boolean
	ariaDescribedby?: string
}

export function AboutDialogWrapper({
	open,
	onOpenChange,
	children,
	disableTheme = false,
	ariaDescribedby,
}: Readonly<AboutDialogWrapperProps>) {
	const __ = useTranslations('Default')
	const [isDialogOpen, setIsDialogOpen] = useState(open)

	useEffect(() => {
		if (open) setIsDialogOpen(true)
	}, [open])

	function handleOpenChange(nextOpen: boolean) {
		onOpenChange(nextOpen)
		if (nextOpen) setIsDialogOpen(true)
	}

	function handleExitComplete() {
		if (!open) setIsDialogOpen(false)
	}

	return (
		<DialogComponent.Root open={isDialogOpen} onOpenChange={handleOpenChange}>
			<AnimatePresence onExitComplete={handleExitComplete}>
				{open && (
					<DialogComponent.Portal key="dialog-fullscreen">
						<MotionDiv
							role="presentation"
							aria-hidden
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { duration: FULLSCREEN_ENTER_DURATION_S, ease: FULLSCREEN_EASE } }}
							exit={{ opacity: 0, transition: { duration: FULLSCREEN_EXIT_DURATION_S, ease: FULLSCREEN_EASE } }}
							className={cn(
								'fixed inset-0 z-99 overflow-hidden bg-white/50 backdrop-blur-xs dark:bg-black/50',
								getDialogOverlayBaseClassName(disableTheme),
							)}
							onClick={() => handleOpenChange(false)}
						/>

						<MotionDiv
							className="pointer-events-none fixed inset-x-0 top-0 z-101 flex h-[7.5rem] w-full items-center justify-center"
							{...dialogCloseMotionProps}
						>
							<DialogComponent.Close className={dialogCloseButtonClassName} aria-label={__('close')}>
								<IconX className="size-7" aria-hidden />
							</DialogComponent.Close>
						</MotionDiv>

						<DialogComponent.Content
							asChild
							forceMount
							onOpenAutoFocus={onDialogOpenAutoFocus}
							onPointerDownOutside={onDialogPointerDownOutside}
							aria-describedby={ariaDescribedby}
						>
							<MotionDiv
								initial={{ y: '100%' }}
								animate={{ y: 0, transition: { duration: FULLSCREEN_ENTER_DURATION_S, ease: FULLSCREEN_EASE } }}
								exit={{ y: '100%', transition: { duration: FULLSCREEN_EXIT_DURATION_S, ease: FULLSCREEN_EASE } }}
								className="shadow-dialog dark:shadow-dialog-inverted pointer-events-auto fixed inset-x-0 bottom-0 z-100 flex h-[calc(100dvh_-_7.5rem)] w-full flex-col overflow-hidden rounded-t-4xl border border-black/15 bg-white outline-none select-none dark:border-white/20 dark:bg-black"
							>
								<div className="scrollbar-hidden size-full overflow-x-hidden overflow-y-auto">{children}</div>
							</MotionDiv>
						</DialogComponent.Content>
					</DialogComponent.Portal>
				)}
			</AnimatePresence>
		</DialogComponent.Root>
	)
}
