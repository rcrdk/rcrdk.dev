'use client'

import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { useHaptics } from '@/hooks/use-haptics'
import { cn } from '@/utils/tailwind-cn'

const baseVariants = cva(
	cn(
		'squircle-rounded flex cursor-pointer items-center justify-center rounded-xl border border-transparent whitespace-nowrap transition-all duration-400 outline-none select-none',
		'focus-visible:border-accent-blue focus-visible:ring-accent-blue/40 focus-visible:text-accent-blue text-content-light dark:text-content-dark focus-visible:ring-4',
		'font-medium active:scale-95 active:duration-75',
		'[&_svg]:stroke-[1.75]',
	),
	{
		variants: {
			variant: {
				solid:
					'bg-content-light hover:bg-content-light/80 focus-visible:!bg-accent-blue text-white focus-visible:border-white focus-visible:text-white dark:bg-white dark:text-black dark:hover:bg-white/85 dark:focus-visible:border-black',
				outline:
					'focus-visible:!border-accent-blue focus-visible:bg-accent-blue/10 dark:focus-visible:bg-accent-blue/20 border-black/15 bg-black/3 hover:border-black/30 hover:bg-black/6 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/12',
				'outline-touch':
					'focus-visible:!border-accent-blue focus-visible:bg-accent-blue/20 border-white/20 bg-white/10 text-white hover:border-white/50 hover:bg-white/15',
				discret:
					'focus-visible:bg-accent-blue/10 focus-visible:dark:bg-accent-blue/20 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15',
				glowing: 'bg-white/65 hover:bg-white dark:bg-black/75 dark:hover:bg-black',
				'outline-warning':
					'dark:hover:bg-orange/40 border-orange-600/75 bg-orange-500/15 text-orange-600 hover:border-orange-700 hover:bg-orange-500/25 focus-visible:border-orange-600/75 focus-visible:text-orange-600 focus-visible:ring-orange-500/20 dark:border-orange-500/50 dark:bg-orange-400/20 dark:text-orange-400 dark:hover:border-orange-400/75 dark:focus-visible:border-orange-500/50 dark:focus-visible:text-orange-400 dark:focus-visible:ring-orange-300/30',
			},
			size: {
				base: 'xs:gap-4 xs:px-5 h-12 gap-3 px-5 [&_svg]:size-6',
				lg: 'xs:h-14 xs:px-6 h-12 gap-4 px-6 [&_svg]:size-7',
				sm: 'xs:h-10 xs:px-4 h-10 gap-2 px-2 [&_svg]:size-5',
				xs: 'xs:h-8 xs:ap-4 xs:px-5 h-8 gap-4 px-4 [&_svg]:size-5 [&_svg]:stroke-[2]',
			},
			icon: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			{
				size: 'base',
				icon: true,
				className: 'w-12 !px-0',
			},
			{
				size: 'lg',
				icon: true,
				className: 'xs:w-14 w-12 !px-0',
			},
			{
				size: 'sm',
				icon: true,
				className: 'xs:w-10 w-10 !px-0',
			},
			{
				size: 'xs',
				icon: true,
				className: 'xs:w-8 w-8 !px-0',
			},
		],
		defaultVariants: {
			variant: 'discret',
			size: 'base',
			icon: false,
		},
	},
)

type ButtonVariantsProps = VariantProps<typeof baseVariants>

interface ButtonProps<T extends React.ElementType> {
	as?: T
	variant?: ButtonVariantsProps['variant']
	size?: ButtonVariantsProps['size']
	icon?: ButtonVariantsProps['icon']
	onClick?: React.MouseEventHandler<any>
	haptic?: boolean
}

export function Button<T extends React.ElementType = 'button'>({
	as,
	variant = 'discret',
	size = 'base',
	icon = false,
	onClick,
	className,
	haptic = false,
	...props
}: Readonly<ButtonProps<T>> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
	const Component = as || 'button'

	const { triggerHaptic } = useHaptics()

	function handleClick(e: React.MouseEvent<any>) {
		onClick?.(e)
		requestAnimationFrame(() => haptic && triggerHaptic())
	}

	const classNames = cn(baseVariants({ variant, size, icon }), className)
	const isButtonOrAnchor = Component === 'button' || Component === 'a'

	if (isButtonOrAnchor) return <Component {...props} className={classNames} onClick={handleClick} />

	// @ts-expect-error - Component is a valid React element type
	return <Component {...props} className={classNames} />
}
