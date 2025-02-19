import { isLeapYearCheck } from '@/lib/dayjs'

export const DATES = {
	bithday: '03-03',
	careerBirthday: '05-02',
	coffeeDay: '04-14',
	publicistDay: '02-01',
	developersDay: isLeapYearCheck() ? '09-12' : '09-13',
	brazilianHrDay: '06-03',
	internationalHrDay: '05-20',
}

export const FULL_DATES = {
	birthday: '1996-03-03',
	careerBirthday: '2013-05-02',
} as Record<string, `${string}-${string}-${string}`>
