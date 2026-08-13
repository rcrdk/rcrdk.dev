import type { ComponentProps } from 'react'
import { Content, Portal } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils'

const DROPDOWN_CONTENT_CLASSNAME =
	'data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out shadow-dialog dark:bg-dropdown-dark dark:shadow-dialog-inverted squircle-rounded flex [transform-origin:var(--radix-dropdown-menu-content-transform-origin)] flex-col divide-y divide-black/10 rounded-xl border border-black/20 bg-white whitespace-nowrap will-change-transform dark:divide-white/15 dark:border-white/20'

type DropdownMenuProps = ComponentProps<typeof Content> & {
	portal?: boolean
}

export function DropdownMenu({ portal = false, className, ...props }: Readonly<DropdownMenuProps>) {
	const contentClassName = cn(DROPDOWN_CONTENT_CLASSNAME, className)

	if (!portal) return <Content {...props} className={contentClassName} />

	return (
		<Portal>
			<Content {...props} className={contentClassName} />
		</Portal>
	)
}
