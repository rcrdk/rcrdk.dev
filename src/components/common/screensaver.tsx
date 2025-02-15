/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useIdle, useMediaQuery } from 'react-haiku'

import { CONFIG } from '@/config'
import { useDvdScreensaver } from '@/hooks/dvd-screensaver'
import { cn } from '@/utils/tailwind-cn'

export function Screensaver() {
	const gifs = useMemo(() => {
		return [
			'https://media1.tenor.com/m/Pt-w7oWaXRgAAAAd/alma-gemea-brazilian-telenovela.gif',
			'https://media1.tenor.com/m/MZtZQlm9C-AAAAAd/alma-gemea-brazilian-telenovela.gif',
			'https://media1.tenor.com/m/rhJvvipZJ_4AAAAC/folkloreperry-prismfancy.gif',
			'https://media1.tenor.com/m/5iQ7jgQzrKoAAAAd/gloria-maria.gif',
			'https://media1.tenor.com/m/wj2mp9FYXqsAAAAd/stage-red.gif',
			'https://media1.tenor.com/m/UrOzKURAe4MAAAAd/dog-uncomfortable.gif',
			'https://media1.tenor.com/m/iLXyplClUN0AAAAd/dan%C3%A7ando-sbt.gif',
			'https://media1.tenor.com/m/DqVZXey5dmgAAAAd/gretchen-pandlr.gif',
			'https://media1.tenor.com/m/er79MOzGDnIAAAAC/gretchen-pandlr.gif',
			'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVveDA4MWdsMWltMTk4ODd0dGdrOG0zM3czdWYwbmlpdG9tYTY1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4pSYa2tgONeoWxKE/giphy.gif',
			'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdml6c3QwbDNhZmZ4dnFocG51YnZ6eDI3NXJnYTQ1MDJtZHZqeW5wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3agRNMoG5Y8nu/giphy.gif',
			'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamRzeHNla3gzenRrNnZzcXNqazlqcTFkdmo2ZHhjeTNxcXNsZHU1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwFq0liwGtrLNxC/giphy.gif',
			'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3VvYmF4d3JzcnZjemQxeDEwaWdlMDR2MHIxc3lheGMzM2M5MHVjciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J6ctgPvnDpDi0/giphy.gif',
			'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm9rN2FvdTNnZmxvdHNmaHJqNWdtbnF6bHFzcTlhd3c4b3ByYzVhYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kaq6GnxDlJaBq/giphy.gif',
			'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGRobGg2YjI1M2gzaTdlcGNyNXNsN29uNTVqczhnYnBzOXFoZzQzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vR3ogLP5ClWuRFK/giphy.gif',
			'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3NwMDhtc2FiMW14ZWlyeDRxN3d3b3dtN3R4Y2RleWd1emthbThlZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oDwLkh1diFCH6/giphy.gif',
		]
	}, [])

	const [gif, setGif] = useState(0)

	const isIddle = useIdle(CONFIG.SCREENSAVER_TIMEOUT, { initialState: false })
	const isTouchDevice = useMediaQuery('(hover : none)', false)
	const __ = useTranslations('Default')

	const { containerRef, elementRef } = useDvdScreensaver({
		speed: 3,
	})

	useEffect(() => {
		const random = Math.floor(Math.random() * gifs.length)

		let timer: NodeJS.Timeout

		if (!isIddle) {
			timer = setTimeout(() => {
				setGif(random)
			}, 700)
		}

		return () => clearTimeout(timer)
	}, [gifs, isIddle])

	if (isTouchDevice) {
		return null
	}

	return (
		<div
			ref={containerRef}
			className={cn(
				'fixed inset-0 z-[50] bg-white transition-opacity duration-700 dark:bg-black',
				isIddle ? 'opacity-100' : 'pointer-events-none opacity-0',
			)}
		>
			<h1 className="font-heading xs:text-7xl absolute inset-0 flex items-center justify-center p-16 text-center text-6xl font-black tracking-tighter text-balance md:text-8xl lg:text-9xl dark:text-white">
				{__('screensaver')}
			</h1>

			<div ref={elementRef} className="relative size-48 overflow-hidden rounded-xl sm:size-64 lg:size-80">
				<img src={gifs[gif]} alt="" className="absolute inset-0 size-full object-cover object-center" />
			</div>
		</div>
	)
}
