import { cn } from '@/utils/tailwind-cn'

type Props = {
	children: React.ReactNode
	className?: string
	classNameCenter?: string
}

export function Section({ children, className, classNameCenter }: Props) {
	return (
		<section className={cn('layout:snap-start layout:min-h-dvh flex w-full [&_div]:max-w-full', className)}>
			<div
				className={cn('xs:py-18 layout:pt-20 layout-sm:pt-32 my-auto w-full py-14 md:py-16 xl:py-20', classNameCenter)}
			>
				{children}
			</div>
		</section>
	)
}
