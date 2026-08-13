'use client'

import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { DATES, FULL_DATES } from '@/config/dates'
import { useConfetti } from '@/hooks/use-confetti'
import { yearsFromThen } from '@/lib/dayjs'

const DELAY_SPECIAL_DATE = 1250
const TOAST_DURATION = 10000
const DATE_FORMAT = 'MM-DD'

const getToday = () => dayjs().format(DATE_FORMAT)

const isTodayASpecialDate = () => Object.values(DATES).includes(getToday())

interface ActionButtonProps {
	label: string
	onClick: VoidFunction
}

function ActionButton({ label, onClick }: Readonly<ActionButtonProps>) {
	return (
		<button
			onClick={onClick}
			className="bg-accent-blue hover:bg-accent-blue/85 focus-visible:!ring-accent-blue/40 cursor-pointer rounded-xl !border !border-transparent px-5 py-2 font-semibold text-nowrap text-white transition-all !outline-none focus-visible:!border-white focus-visible:!ring-4 active:scale-95 active:duration-75 dark:focus-visible:!border-black"
		>
			{label}
		</button>
	)
}

export function SpecialDates() {
	const { fireConfettiWithSound } = useConfetti()
	const __ = useTranslations('Default')

	useEffect(() => {
		function showSpecialDate() {
			const today = getToday()

			const specialDates: Record<string, { icon: string; text: string }> = {
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
				[DATES.cssReleaseDate]: {
					icon: '🎨',
					text: __('specialDates.dates.cssReleaseDate', { years: yearsFromThen(FULL_DATES.cssReleaseDate) }),
				},
			}

			const todaySpecialDate = specialDates[today]
			if (!todaySpecialDate) return

			fireConfettiWithSound()
			toast.dismiss('special-dates-existence')

			toast(todaySpecialDate.text, {
				duration: TOAST_DURATION,
				icon: todaySpecialDate.icon,
				position: 'bottom-center',
				action: <ActionButton label={__('specialDates.button.more')} onClick={fireConfettiWithSound} />,
			})
		}

		if (isTodayASpecialDate()) {
			const timer = setTimeout(() => {
				toast(__('specialDates.title'), {
					position: 'bottom-center',
					action: <ActionButton label={__('specialDates.button.discover')} onClick={showSpecialDate} />,
					duration: Infinity,
					icon: '🎉',
					id: 'special-dates-existence',
				})
			}, DELAY_SPECIAL_DATE)

			return () => clearTimeout(timer)
		}
	}, [__, fireConfettiWithSound])

	return null
}
