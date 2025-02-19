'use client'

import { useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from 'react-haiku'
import { toast } from 'sonner'

import { DATES, FULL_DATES } from '@/config/dates'
import { useConfetti } from '@/hooks/confetti'
import { yearsFromThen } from '@/lib/dayjs'
import { env } from '@/lib/env'

const ActionButton = ({ label, onClick }: { label: string; onClick: VoidFunction }) => (
	<button
		onClick={onClick}
		className="bg-accent-blue hover:bg-accent-blue/85 focus-visible:!ring-accent-blue/40 cursor-pointer rounded-xl !border !border-transparent px-5 py-2 font-semibold text-nowrap text-white transition-all !outline-none focus-visible:!border-white focus-visible:!ring-4 active:scale-95 active:duration-75 dark:focus-visible:!border-black"
	>
		{label}
	</button>
)

export function SpecialDates() {
	const { fireConfetti } = useConfetti()
	const __ = useTranslations('Default')
	const isMobile = useMediaQuery('(max-width: 600px)', false)

	const triggerConfetti = useCallback(() => {
		fireConfetti()
		new Audio(`${env.NEXT_PUBLIC_APP_URL}/confetti-pop.mp3`).play()
	}, [fireConfetti])

	const showSpecialDate = useCallback(() => {
		const isASpecialDate = Object.values(DATES).includes(dayjs().format('MM-DD'))
		const today = dayjs().format('MM-DD')

		if (!isASpecialDate) return

		const data = {
			[DATES.bithday]: {
				icon: '🎂',
				text: __('specialDates.dates.birthday', { age: yearsFromThen(FULL_DATES.birthday) }),
			},
			[DATES.careerBirthday]: {
				icon: '👨🏼‍💻',
				text: __('specialDates.dates.careerBirthday', { years: yearsFromThen(FULL_DATES.careerBirthday) }),
			},
			[DATES.coffeeDay]: {
				icon: '☕️',
				text: __('specialDates.dates.coffeeDay'),
			},
			[DATES.publicistDay]: {
				icon: '👨🏼‍🎨',
				text: __('specialDates.dates.publicistDay'),
			},
			[DATES.developersDay]: {
				icon: '💻',
				text: __('specialDates.dates.developersDay'),
			},
			[DATES.internationalHrDay]: {
				icon: '💬',
				text: __('specialDates.dates.internationalHrDay'),
			},
			[DATES.brazilianHrDay]: {
				icon: '💬',
				text: __('specialDates.dates.brazilianHrDay'),
			},
		} as Record<string, { icon: string; text: string }>

		triggerConfetti()
		toast.dismiss('special-dates-existence')

		toast(data[today].text, {
			duration: 10000,
			icon: data[today].icon,
			position: isMobile ? 'bottom-center' : 'top-center',
			action: <ActionButton label={__('specialDates.button.more')} onClick={triggerConfetti} />,
		})
	}, [__, triggerConfetti, isMobile])

	useEffect(() => {
		const isASpecialDate = Object.values(DATES).includes(dayjs().format('MM-DD'))

		if (isASpecialDate) {
			const timer = setTimeout(() => {
				toast(__('specialDates.title'), {
					position: isMobile ? 'bottom-center' : 'top-center',
					action: <ActionButton label={__('specialDates.button.discover')} onClick={showSpecialDate} />,
					duration: Infinity,
					icon: '🎉',
					id: 'special-dates-existence',
				})
			}, 1250)

			return () => clearTimeout(timer)
		}
	}, [__, showSpecialDate, isMobile])

	return null
}
