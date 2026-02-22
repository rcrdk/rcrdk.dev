'use client'

import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/utils/tailwind-cn'

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
	return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-overlay"
			className={cn(
				'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 dark:bg-backdrop/50 fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs',
				className,
			)}
			{...props}
		/>
	)
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return <DrawerPrimitive.Title data-slot="drawer-title" className={cn('text-2xl font-bold', className)} {...props} />
}

interface DrawerContentProps extends React.ComponentProps<typeof DrawerPrimitive.Content> {
	size?: 'center' | 'full' | 'center-small'
}

function DrawerContent({ className, children, size = 'center', ...props }: Readonly<DrawerContentProps>) {
	const isCenter = size === 'center'
	const isFull = size === 'full'
	const isCenterSmall = size === 'center-small'

	return (
		<DrawerPortal data-slot="drawer-portal">
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot="drawer-content"
				aria-labelledby={undefined}
				className={cn(
					'text-content-light dark:text-content-dark group/drawer-content fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-4xl border-black/10 bg-white text-sm outline-none dark:border-white/10 dark:bg-black',
					'shadow-drawer dark:shadow-drawer-inverted',
					'layout:max-h-[calc(100dvh-7.5rem)] max-h-[calc(100dvh-6.625rem)]',
					isCenter &&
						'layout:max-w-[calc(100dvw-17rem)] layout:border-t layout:border-x mx-auto border-t md:max-w-[calc(100dvw-5rem)] md:border-x md:border-t',
					isCenterSmall && 'layout:border-t layout:border-x mx-auto border-t md:max-w-xl md:border-x md:border-t',
					isFull && 'size-full border-t',
					className,
				)}
				{...props}
			>
				<div className="scrollbar-hidden relative overflow-x-hidden overflow-y-auto">{children}</div>
			</DrawerPrimitive.Content>
		</DrawerPortal>
	)
}

interface DrawerHandlerProps extends React.ComponentProps<'div'> {
	absolute?: boolean
}

function DrawerHandler({ className, absolute = false, ...props }: Readonly<DrawerHandlerProps>) {
	return (
		<div
			className={cn(
				'mx-auto my-6 h-1.5 w-20 rounded-full bg-black/20 sm:w-40 dark:bg-white/15',
				absolute && 'absolute top-0 left-1/2 z-1 -translate-x-1/2',
				className,
			)}
			{...props}
		/>
	)
}

export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerTitle, DrawerHandler }
