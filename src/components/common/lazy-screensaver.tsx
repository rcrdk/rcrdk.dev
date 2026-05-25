'use client'

import dynamic from 'next/dynamic'

const Screensaver = dynamic(
	() => import('@/components/common/screensaver').then((module) => ({ default: module.Screensaver })),
	{ ssr: false },
)

export function LazyScreensaver() {
	return <Screensaver />
}
