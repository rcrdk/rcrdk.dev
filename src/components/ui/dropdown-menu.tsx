import * as Dropdown from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/tailwind-cn'

type Props = React.ComponentProps<typeof Dropdown.Content> & {
	portal?: boolean
}

export function DropdownMenu({ portal = false, ...props }: Readonly<Props>) {
	if (portal)
		return (
			<Dropdown.Portal>
				<Dropdown.Content
					{...props}
					className={cn(
						'data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out shadow-dialog dark:bg-dropdown-dark dark:shadow-dialog-inverted flex [transform-origin:var(--radix-dropdown-menu-content-transform-origin)] flex-col divide-y divide-black/10 rounded-xl border border-black/20 bg-white whitespace-nowrap will-change-transform dark:divide-white/15 dark:border-white/20',
						props.className,
					)}
				/>
			</Dropdown.Portal>
		)

	return (
		<Dropdown.Content
			{...props}
			className={cn(
				'data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out shadow-dialog dark:bg-dropdown-dark dark:shadow-dialog-inverted flex [transform-origin:var(--radix-dropdown-menu-content-transform-origin)] flex-col divide-y divide-black/10 rounded-xl border border-black/20 bg-white whitespace-nowrap will-change-transform dark:divide-white/15 dark:border-white/20',
				props.className,
			)}
		/>
	)
}
