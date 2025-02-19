import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(isLeapYear)

// dayjs('2000-01-01').isLeapYear() // true

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
