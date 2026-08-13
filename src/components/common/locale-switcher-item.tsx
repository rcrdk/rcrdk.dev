'use client'

import type { ComponentRef, Ref } from 'react'

import { cn } from '@/utils'

interface LocaleSwitcherItemProps {
	title: string
	acronym: string
	isActive: boolean
	onSelect: VoidFunction
	itemRef: Ref<ComponentRef<'button'>>
}

export function LocaleSwitcherItem({ title, acronym, isActive, onSelect, itemRef }: Readonly<LocaleSwitcherItemProps>) {
	return (
		<button
			type="button"
			ref={itemRef}
			tabIndex={isActive ? -1 : undefined}
			className={cn(
				'group squircle-rounded relative z-10 flex size-8 items-center justify-center rounded-xl transition-[background-color,box-shadow,transform] duration-200 ease-out outline-none select-none',
				isActive && 'pointer-events-none',
				!isActive &&
					'cursor-pointer hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-black/10 active:scale-95 dark:hover:bg-white/5 dark:focus-visible:ring-white/30',
			)}
			onClick={onSelect}
		>
			<abbr
				title={title}
				className={cn(
					'text-sm font-semibold no-underline transition-colors duration-200 ease-out',
					isActive
						? 'text-black dark:text-white'
						: 'text-black/60 group-hover:text-black dark:text-white/60 dark:group-hover:text-white',
				)}
			>
				{acronym}
			</abbr>
		</button>
	)
}
