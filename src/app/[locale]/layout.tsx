import '@/styles/globals.css'

import { notFound } from 'next/navigation'

import { KonamiCodeGameTask } from '@/components/game/tasks/konami-code-task'
import { LocaleGameTask } from '@/components/game/tasks/locale-task'
import { routing } from '@/i18n/routing'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: 'pt-br' | 'en' }>
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	return (
		<>
			<LocaleGameTask />
			<KonamiCodeGameTask />

			{children}
		</>
	)
}
