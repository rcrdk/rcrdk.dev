'use client'

import dynamic from 'next/dynamic'

const SpecialDates = dynamic(
	() => import('@/components/common/special-dates').then((module) => ({ default: module.SpecialDates })),
	{ ssr: false },
)

export function LazySpecialDates() {
	return <SpecialDates />
}
