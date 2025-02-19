/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { IconLoader } from '@tabler/icons-react'

import { env } from '@/lib/env'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	src: string
	folder?: 'projects'
}

export function Image({ src, folder = 'projects' }: Props) {
	const [loading, setLoading] = useState(true)

	return (
		<>
			<IconLoader
				className={cn(
					'absolute top-1/2 left-1/2 size-10 -translate-1/2 animate-spin stroke-1 transition-opacity [animation-duration:2000ms]',
					loading ? 'opacity-50' : 'opacity-0',
				)}
			/>

			<img
				src={`${env.NEXT_PUBLIC_APP_URL}/${folder}/${src}`}
				alt=""
				className={cn(
					'h-full w-full object-cover transition-all duration-500 group-hover:scale-105',
					loading ? 'opacity-0' : 'opacity-100',
				)}
				loading="lazy"
				onLoad={(e) => e.currentTarget.complete && setLoading(false)}
			/>
		</>
	)
}
