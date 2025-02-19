import { cn } from '@/utils/tailwind-cn'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	size?: 'fluid' | 'center'
	sideSpacing?: 'base' | 'lg'
	classNameCenter?: React.HTMLAttributes<HTMLDivElement>['className']
}
export function Container({ size = 'fluid', sideSpacing = 'base', classNameCenter, ...props }: Props) {
	return (
		<div
			{...props}
			className={cn(
				'w-full max-w-full',
				sideSpacing === 'base' && 'xs:px-6 px-4 sm:px-8 md:px-10',
				sideSpacing === 'lg' && 'xs:px-12 px-6 sm:px-16 md:px-20',
				props.className,
			)}
		>
			<div
				className={cn(
					'w-full',
					size === 'fluid' && 'max-w-full',
					size === 'center' && 'mx-auto max-w-[768px]',
					classNameCenter,
				)}
			>
				{props.children}
			</div>
		</div>
	)
}
