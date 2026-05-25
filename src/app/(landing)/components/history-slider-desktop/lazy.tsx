'use client'

import type { ComponentProps, ComponentType } from 'react'
import dynamic from 'next/dynamic'

import type { HistorySliderDesktop } from '@/app/(landing)/components/history-slider-desktop'

type HistorySliderDesktopProps = ComponentProps<typeof HistorySliderDesktop>

export const LazyHistorySliderDesktop = dynamic(
	() =>
		import('@/app/(landing)/components/history-slider-desktop').then((module) => ({
			default: module.HistorySliderDesktop,
		})),
	{ ssr: false },
) as ComponentType<HistorySliderDesktopProps>
