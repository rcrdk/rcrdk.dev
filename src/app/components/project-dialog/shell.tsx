'use client'

import { type ReactNode } from 'react'

import { Layout } from '@/app/components/project-dialog/layout'

type Variant = 'cover' | 'gallery'

const CONTENT_CLASS: Record<Variant, string> = {
	cover: 'max-w-full md:max-w-2xl',
	gallery: 'layout:max-w-[calc(100dvw-17rem)] max-w-full md:max-w-[calc(100dvw-5rem)]',
}

interface ShellProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	variant: Variant
	children: ReactNode
	disableTheme?: boolean
	ariaDescribedby?: string
}

export function Shell({
	open,
	onOpenChange,
	variant,
	children,
	disableTheme = false,
	ariaDescribedby,
}: Readonly<ShellProps>) {
	return (
		<Layout
			open={open}
			onOpenChange={onOpenChange}
			disableTheme={disableTheme}
			ariaDescribedby={ariaDescribedby}
			contentClassName={CONTENT_CLASS[variant]}
		>
			{children}
		</Layout>
	)
}
