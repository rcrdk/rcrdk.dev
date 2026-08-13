import type { AnchorHTMLAttributes, Ref } from 'react'

import { cn } from '@/utils'

interface NavLinkProps
	extends Pick<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		'href' | 'className' | 'onClick' | 'aria-controls' | 'children'
	> {
	showActive: boolean
	onHoverChange: (hovered: boolean) => void
	linkRef: Ref<HTMLDivElement>
}

export function NavLink({
	href,
	className,
	onClick,
	'aria-controls': ariaControls,
	children,
	showActive,
	onHoverChange,
	linkRef,
}: Readonly<NavLinkProps>) {
	return (
		<div
			ref={linkRef}
			className="relative"
			onMouseEnter={() => onHoverChange(true)}
			onMouseLeave={() => onHoverChange(false)}
		>
			<a href={href} className={className} onClick={onClick} aria-controls={ariaControls}>
				<span className={cn('relative z-10', showActive && 'text-content-light dark:text-white')}>{children}</span>
			</a>
		</div>
	)
}
