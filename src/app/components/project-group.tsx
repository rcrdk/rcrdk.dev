import type { HTMLAttributes } from 'react'

import { cn } from '@/utils'

interface ProjectGroupProps extends HTMLAttributes<HTMLDivElement> {
	title: string
	hasGallery: boolean
}

export function ProjectGroup({ title, children, className, hasGallery, ...props }: Readonly<ProjectGroupProps>) {
	return (
		<div className={cn('order-1 flex flex-col gap-2', !hasGallery && 'w-full', className)} {...props}>
			<h6 className="text-base font-bold text-inherit dark:text-white">{title}:</h6>
			{children}
		</div>
	)
}
