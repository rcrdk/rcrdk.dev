/* eslint-disable prettier/prettier */
import { cn } from '@/utils/tailwind-cn'

type Props<T extends React.ElementType> = {
	as?: T
	variant?: 'solid' | 'outline' | 'outline-touch' | 'discret'
	size?: 'base' | 'lg' | 'sm' | 'xs'
	icon?: boolean
}

export function Button<T extends React.ElementType = 'button'>({
	as,
	variant = 'discret',
	size = 'base',
	icon = false,
	...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) {
	const Component = as || 'button'

	return (
		<Component
			{...props}
			className={cn(
				'flex cursor-pointer items-center justify-center rounded-xl border border-transparent whitespace-nowrap transition-all duration-400 outline-none select-none',
				'focus-visible:border-accent-blue focus-visible:ring-4 focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue text-content-light dark:text-content-dark',
				'active:scale-95 active:duration-75',

				size === 'base' && 'h-12 gap-3 px-5 xs:gap-4 xs:px-5',
				size === 'base' && icon && '!px-0 w-12',
				
				size === 'lg' && 'h-12 gap-4 px-6 xs:h-14 xs:gap-5 xs:px-6',
				size === 'lg' && icon && 'w-12 !px-0 xs:w-14',

				size === 'sm' && 'h-10 gap-2 px-2 xs:h-10 xs:px-4',
				size === 'sm' && icon && 'w-10 !px-0 xs:w-10',

				size === 'xs' && 'h-8 gap-4 px-4 xs:h-8 xs:ap-4 xs:px-5',
				size === 'xs' && icon && 'w-8 !px-0 xs:w-9',
				

				variant === 'solid' && 'bg-content-light dark:bg-white text-white dark:text-black hover:bg-content-light/80 dark:hover:bg-white/85 focus-visible:!bg-accent-blue focus-visible:text-white focus-visible:border-white dark:focus-visible:border-black',
				variant === 'outline' && 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border-black/20 hover:border-black/60 dark:border-white/20 dark:text-white dark:hover:border-white/50 focus-visible:!border-accent-blue focus-visible:bg-accent-blue/10 dark:focus-visible:bg-accent-blue/20',
				variant === 'discret' && 'bg-black/5 dark:bg-white/10  hover:bg-black/10 dark:hover:bg-white/15 focus-visible:bg-accent-blue/10 focus-visible:dark:bg-accent-blue/20',

				variant === 'outline-touch' && 'bg-white/10 hover:bg-white/15 border-white/20 text-white hover:border-white/50 focus-visible:!border-accent-blue focus-visible:bg-accent-blue/20',
			
				props.className,
			)}
		/>
	)
}
