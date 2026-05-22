import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isLeapYear)
dayjs.extend(relativeTime)

dayjs.tz.setDefault('America/Sao_Paulo')

export function isLeapYearCheck(): boolean {
	return dayjs().isLeapYear()
}

export function yearsFromThen(dateToCompare: `${string}-${string}-${string}`): number {
	const today = dayjs()
	return today.diff(dateToCompare, 'year')
}

export function lastFmRelativeTime(date: string, locale: string): string {
	const isoDate = dayjs(date, 'DD MMM YYYY, HH:mm').format('YYYY-MM-DDTHH:mm:00')

	const parsedDate = dayjs.utc(isoDate).tz(dayjs.tz.guess())

	return parsedDate.locale(locale).fromNow()
}
