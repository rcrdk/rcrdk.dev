import { cn } from '@/utils/tailwind-cn'

type Props<T extends React.ElementType> = {
	as?: T
	variant?: 'solid' | 'outline' | 'outline-touch' | 'discret' | 'glowing' | 'outline-warning'
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
				'focus-visible:border-accent-blue focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue text-content-light dark:text-content-dark focus-visible:ring-4',
				'active:scale-95 active:duration-75',

				size === 'base' && 'xs:gap-4 xs:px-5 h-12 gap-3 px-5',
				size === 'base' && icon && 'w-12 !px-0',

				size === 'lg' && 'xs:h-14 xs:gap-5 xs:px-6 h-12 gap-4 px-6',
				size === 'lg' && icon && 'xs:w-14 w-12 !px-0',

				size === 'sm' && 'xs:h-10 xs:px-4 h-10 gap-2 px-2',
				size === 'sm' && icon && 'xs:w-10 w-10 !px-0',

				size === 'xs' && 'xs:h-8 xs:ap-4 xs:px-5 h-8 gap-4 px-4',
				size === 'xs' && icon && 'xs:w-8 w-8 !px-0',

				variant === 'solid' &&
					'bg-content-light hover:bg-content-light/80 focus-visible:!bg-accent-blue text-white focus-visible:border-white focus-visible:text-white dark:bg-white dark:text-black dark:hover:bg-white/85 dark:focus-visible:border-black',
				variant === 'outline' &&
					'focus-visible:!border-accent-blue focus-visible:bg-accent-blue/10 dark:focus-visible:bg-accent-blue/20 border-black/20 bg-black/5 hover:border-black/60 hover:bg-black/10 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/15',
				variant === 'discret' &&
					'focus-visible:bg-accent-blue/10 focus-visible:dark:bg-accent-blue/20 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15',
				variant === 'outline-touch' &&
					'focus-visible:!border-accent-blue focus-visible:bg-accent-blue/20 border-white/20 bg-white/10 text-white hover:border-white/50 hover:bg-white/15',
				variant === 'glowing' && 'bg-white/65 hover:bg-white dark:bg-black/75 dark:hover:bg-black',
				variant === 'outline-warning' &&
					'dark:hover:bg-orange/40 border-orange-600/75 bg-orange-500/15 font-medium text-orange-600 hover:border-orange-700 hover:bg-orange-500/25 focus-visible:border-orange-600/75 focus-visible:text-orange-600 focus-visible:ring-orange-500/20 dark:border-orange-500/50 dark:bg-orange-400/20 dark:text-orange-400 dark:hover:border-orange-400/75 dark:focus-visible:border-orange-500/50 dark:focus-visible:text-orange-400 dark:focus-visible:ring-orange-300/30',

				props.className,
			)}
		/>
	)
}
