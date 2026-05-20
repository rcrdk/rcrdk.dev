import { cn } from '@/utils/tailwind-cn'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title: string
	hasGallery: boolean
}

export function ProjectDrawerGroup({ title, children, className, hasGallery, ...props }: Readonly<Props>) {
	return (
		<div className={cn('order-1 flex flex-col gap-2', !hasGallery && 'w-full', className)} {...props}>
			<h6 className="text-base font-bold text-inherit dark:text-white">{title}:</h6>
			{children}
		</div>
	)
}
