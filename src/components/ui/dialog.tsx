'use client'

import { useEffect, useState } from 'react'
import * as DialogComponent from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/components/animated/motion'
import useDetectBrowser from '@/hooks/use-browser'
import { cn } from '@/utils/tailwind-cn'

const FULLSCREEN_EASE = [0.16, 1, 0.3, 1] as const
const FULLSCREEN_ENTER_DURATION_S = 1.2
const FULLSCREEN_EXIT_DURATION_S = 0.8
const FULLSCREEN_CLOSE_ENTER_DELAY_S = 0.15

const dialogCloseMotionProps = {
	initial: { opacity: 0, scale: 0.85 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: FULLSCREEN_ENTER_DURATION_S,
			ease: FULLSCREEN_EASE,
			delay: FULLSCREEN_CLOSE_ENTER_DELAY_S,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.85,
		transition: { duration: FULLSCREEN_EXIT_DURATION_S, ease: FULLSCREEN_EASE },
	},
}

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>

interface DialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	mode: 'content' | 'game' | 'fullscreen' | 'projectWithCover' | 'projectWithGallery'
	children: React.ReactNode
	hasTetris?: boolean
	disableTheme?: boolean
	ariaDescribedby?: string
}

export function Dialog({
	open,
	onOpenChange,
	mode,
	hasTetris = false,
	children,
	disableTheme = false,
	ariaDescribedby,
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
	const isFullscreenMode = mode === 'fullscreen'
	const isGameMode = mode === 'game'
	const isGameWithoutTetris = mode === 'game' && !hasTetris
	const isGameWithTetris = mode === 'game' && hasTetris

	const isProject = ['projectWithCover', 'projectWithGallery'].includes(mode)
	const isProjectWithCover = mode === 'projectWithCover'
	const isProjectWithGallery = mode === 'projectWithGallery'

	useEffect(() => {
		if (!open || !hasTetris) return

		const GAME_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Space'])

		function onKeyDown(event: KeyboardEvent) {
			if (!GAME_KEYS.has(event.key)) return
			event.preventDefault()
		}

		window.addEventListener('keydown', onKeyDown, { capture: true })

		return () => window.removeEventListener('keydown', onKeyDown, { capture: true })
	}, [open, hasTetris])

	const [isFullscreenDialogOpen, setIsFullscreenDialogOpen] = useState(open)

	useEffect(() => {
		if (!isFullscreenMode) return
		if (open) setIsFullscreenDialogOpen(true)
	}, [isFullscreenMode, open])

	function handleFullscreenOpenChange(nextOpen: boolean) {
		onOpenChange(nextOpen)
		if (nextOpen) setIsFullscreenDialogOpen(true)
	}

	function handleFullscreenExitComplete() {
		if (!open) setIsFullscreenDialogOpen(false)
	}

	const dialogOverlayBaseClassName = cn(
		'fixed inset-0 z-99 bg-white/50 backdrop-blur-xs dark:bg-black/50',
		disableTheme && 'disable-themes text-content-light',
	)

	const overlayClassName = cn(
		dialogOverlayBaseClassName,
		'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide overflow-x-hidden overflow-y-auto scroll-smooth',
	)

	const fullscreenOverlayClassName = cn(dialogOverlayBaseClassName, 'overflow-hidden')

	const fullscreenContentClassName = cn(
		'shadow-dialog dark:shadow-dialog-inverted pointer-events-auto fixed inset-x-0 bottom-0 z-100 flex h-[calc(100dvh_-_7.5rem)] w-full flex-col overflow-hidden rounded-t-4xl border border-black/15 bg-white outline-none select-none dark:border-white/20 dark:bg-black',
	)

	const dialogCloseButtonClassName = cn(
		'focus-visible:ring-accent-blue/50 focus-visible:bg-accent-blue pointer-events-auto flex size-12 cursor-pointer items-center justify-center rounded-full backdrop-blur-xs transition-all outline-none focus-visible:text-white focus-visible:ring-4',
		'bg-black/5 text-black/35 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/25',
	)

	if (isFullscreenMode) {
		return (
			<DialogComponent.Root open={isFullscreenDialogOpen} onOpenChange={handleFullscreenOpenChange}>
				<AnimatePresence onExitComplete={handleFullscreenExitComplete}>
					{open && (
						<DialogComponent.Portal key="dialog-fullscreen">
							<MotionDiv
								role="presentation"
								aria-hidden
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: FULLSCREEN_ENTER_DURATION_S, ease: FULLSCREEN_EASE },
								}}
								exit={{
									opacity: 0,
									transition: { duration: FULLSCREEN_EXIT_DURATION_S, ease: FULLSCREEN_EASE },
								}}
								className={fullscreenOverlayClassName}
								onClick={() => handleFullscreenOpenChange(false)}
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
								onOpenAutoFocus={onOpenAutoFocus}
								onPointerDownOutside={onPointerDownOutside}
								aria-describedby={ariaDescribedby}
							>
								<MotionDiv
									initial={{ y: '100%' }}
									animate={{
										y: 0,
										transition: { duration: FULLSCREEN_ENTER_DURATION_S, ease: FULLSCREEN_EASE },
									}}
									exit={{
										y: '100%',
										transition: { duration: FULLSCREEN_EXIT_DURATION_S, ease: FULLSCREEN_EASE },
									}}
									className={fullscreenContentClassName}
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

	return (
		<DialogComponent.Root open={open} onOpenChange={onOpenChange}>
			<DialogComponent.Portal>
				<DialogComponent.Overlay className={overlayClassName}>
					{isProject && (
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
					)}
					<div
						className={cn(
							'pointer-events-none flex min-h-full justify-center',
							!isProject && 'xs:p-4 items-end p-3 max-sm:pt-10 sm:items-center sm:p-10 lg:p-10',
							isProject && 'layout:pt-30 items-end pt-26',
						)}
					>
						<DialogComponent.Content
							className={cn(
								'data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide pointer-events-all squircle-rounded-dialog relative z-10 w-full rounded-3xl will-change-transform outline-none',
								isContentMode && 'max-w-[440px] border border-black/15 md:max-w-[540px] dark:border-white/20',
								isGameWithoutTetris && 'sm:max-w-[440px]',
								isGameWithTetris && 'sm:max-w-[490px]',
								isProject && '!rounded-b-none border-x border-t border-black/15 dark:border-white/20',
								isProjectWithCover && 'max-w-full md:max-w-2xl',
								isProjectWithGallery && 'layout:max-w-[calc(100dvw-17rem)] max-w-full md:max-w-[calc(100dvw-5rem)]',
							)}
							onOpenAutoFocus={onOpenAutoFocus}
							onPointerDownOutside={onPointerDownOutside}
							aria-describedby={ariaDescribedby}
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
									isProject && '!rounded-b-none',
								)}
							>
								{!isProject && (
									<DialogComponent.Close
										className={cn(
											'focus-visible:ring-accent-blue/50 focus-visible:bg-accent-blue xs:top-6 xs:right-6 absolute top-4 right-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-xs transition-all outline-none focus-visible:text-white focus-visible:ring-4',
											'bg-black/5 text-black/35 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/25',
										)}
										aria-label={__('close')}
									>
										<IconX className="size-5" aria-hidden />
									</DialogComponent.Close>
								)}

								{children}
							</div>
						</DialogComponent.Content>
					</div>
				</DialogComponent.Overlay>
			</DialogComponent.Portal>
		</DialogComponent.Root>
	)
}
