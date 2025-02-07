/* eslint-disable prettier/prettier */
import { cn } from '@/utils/tailwind-cn'

type Props<T extends React.ElementType> = {
	as?: T
	variant?: 'primary' | 'primary-discret' | 'outline' | 'discret'
	size?: 'base' | 'lg' | 'sm'
	icon?: boolean
}

export function Button<T extends React.ElementType = 'button'>({
	as,
	variant,
	size = 'base',
	icon = false,
	...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) {
	const Component = as || 'button'

	return (
		<Component
			{...props}
			className={cn(
				'flex cursor-pointer items-center justify-center rounded-xl border border-transparent whitespace-nowrap transition-all outline-none select-none',
				'focus-visible:border-accent-blue focus-visible:ring-4 focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue',
				'active:scale-90',

				size === 'base' && 'h-11 gap-3 px-5 xs:h-12 xs:gap-4 xs:px-6',
				size === 'base' && icon && 'w-11 !px-0 xs:w-12',
				
				size === 'lg' && 'h-12 gap-4 px-6 xs:h-14 xs:gap-5 xs:px-7',
				size === 'lg' && icon && 'w-12 !px-0 xs:w-14',

				size === 'sm' && 'h-8 gap-4 px-4 xs:h-8 xs:ap-4 xs:px-5',
				size === 'sm' && icon && 'w-8 !px-0 xs:w-9',

				variant === 'primary' && 'bg-accent-blue text-white focus-visible:border-white dark:focus-visible:border-black focus-visible:text-white hover:bg-accent-blue/85',
				variant === 'primary-discret' && 'dark:bg-accent-blue/15 dark:border-accent-blue/30 dark:text-accent-blue focus-visible:border-accent-blue focus-visible:bg-accent-blue/15 bg-black/5 hover:text-accent-blue hover:bg-accent-blue/10 dark:hover:border-accent-blue/75 dark:hover:bg-accent-blue/20',
				variant === 'outline' && 'border-black/20 hover:border-black/35 dark:border-white/20 dark:text-white dark:hover:border-white/40',
				variant === 'discret' && 'bg-black/5 dark:bg-white/10  hover:bg-black/10 dark:hover:bg-white/15 focus-visible:bg-accent-blue/10 focus-visible:dark:bg-accent-blue/20',

				props.className,
			)}
		/>
	)
}
