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
 * Checks if the given date (MM-DD format) matches today's date.
 *
 * @param {string} dateToCompare - The date to compare in "MM-DD" format.
 * @returns {boolean} Returns `true` if the given date matches today's month and day, otherwise `false`.
 *
 * @example
 * isDayOfMonth("03-03"); // Returns true if today is March 3rd
 */
export function isDayOfMonth(dateToCompare: `${string}-${string}`): boolean {
	const today = dayjs()
	const birthday = dayjs(`${today.year()}-${dateToCompare}`)
	return today.format('MM-DD') === birthday.format('MM-DD')
}

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
