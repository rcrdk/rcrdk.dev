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

/**
 * Checks if the current year is a leap year.
 *
 * @returns {boolean} - Returns `true` if the current year is a leap year, otherwise `false`.
 */
export function isLeapYearCheck(): boolean {
	return dayjs().isLeapYear()
}

/**
 * Calculates the number of years that have passed since a given date.
 *
 * @param {`${string}-${string}-${string}`} dateToCompare - The date to compare in the format `YYYY-MM-DD`.
 * @returns {number} - The number of years between the given date and today.
 */
export function yearsFromThen(dateToCompare: `${string}-${string}-${string}`): number {
	const today = dayjs()
	return today.diff(dateToCompare, 'year')
}

/**
 * Converts a Last.fm timestamp into a human-readable relative time.
 *
 * @param {string} date - The Last.fm timestamp (format: "DD MMM YYYY, HH:mm").
 * @param {string} locale - The locale for formatting the relative time (e.g., "en", "pt-br").
 * @returns {string} - The relative time string (e.g., "2 hours ago", "há 2 horas").
 */
export function lastFmRelativeTime(date: string, locale: string): string {
	const isoDate = dayjs(date, 'DD MMM YYYY, HH:mm').format('YYYY-MM-DDTHH:mm:00')

	const parsedDate = dayjs.utc(isoDate).tz(dayjs.tz.guess())

	return parsedDate.locale(locale).fromNow()
}
