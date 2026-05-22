import type { AbstractIntlMessages } from 'next-intl'

import type { LocalesType } from '@/i18n/config'

export async function loadMessages(locale: LocalesType): Promise<AbstractIntlMessages> {
	return {
		...(await import(`./${locale}/about.json`)).default,
		...(await import(`./${locale}/contact.json`)).default,
		...(await import(`./${locale}/default.json`)).default,
		...(await import(`./${locale}/game.json`)).default,
		...(await import(`./${locale}/hero.json`)).default,
		...(await import(`./${locale}/project.json`)).default,
		...(await import(`./${locale}/skills.json`)).default,
		...(await import(`./${locale}/seo.json`)).default,
		...(await import(`./${locale}/not-found.json`)).default,
		...(await import(`./${locale}/experiences.json`)).default,
		...(await import(`./${locale}/education.json`)).default,
		...(await import(`./${locale}/share.json`)).default,
	}
}
