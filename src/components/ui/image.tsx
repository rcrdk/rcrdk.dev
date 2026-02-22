'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'
import NextImage from 'next/image'
import { IconLoader } from '@tabler/icons-react'

import { cn } from '@/utils/tailwind-cn'

type Props = Omit<ComponentProps<typeof NextImage>, 'onLoad'>

export function Image({ className, ...props }: Readonly<Props>) {
	const [loading, setLoading] = useState(true)

	return (
		<>
			<IconLoader
				className={cn(
					'absolute top-1/2 left-1/2 size-6 -translate-1/2 animate-spin stroke-2 transition-opacity [animation-duration:2000ms]',
					loading ? 'opacity-50' : 'opacity-0',
				)}
				aria-hidden
			/>

			<NextImage
				className={cn(
					'h-full w-full object-cover transition-all duration-500 group-hover:scale-105',
					loading && 'opacity-0',
					!loading && 'opacity-100',
					className,
				)}
				loading="lazy"
				onLoad={(e) => e.currentTarget.complete && setLoading(false)}
				{...props}
			/>
		</>
	)
}
