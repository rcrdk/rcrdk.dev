import '@/styles/globals.css'

import { notFound } from 'next/navigation'

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

	return <>{children}</>
}
