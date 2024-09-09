import * as Dropdown from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { Button } from '../button'
import { SrOnly } from '../text'
import { DropdownItem, DropdownMenu } from './styles'

export default function HeaderLocale() {
	const __ = useTranslations('Default')
	const { locale: currentLocale } = useRouter()

	const languagesAvailable = useMemo(() => {
		return [
			{
				prefix: 'pt-br',
				title: 'Português',
				acronym: 'PT',
			},
			{
				prefix: 'en-us',
				title: 'English',
				acronym: 'EN',
			},
		]
	}, [])

	const getActiveLocale = useMemo(() => {
		return languagesAvailable.find((locale) => locale.prefix === currentLocale)
	}, [currentLocale, languagesAvailable])

	return (
		<Dropdown.Root>
			<Dropdown.Trigger asChild>
				<Button mode="filledGray">
					<strong>{getActiveLocale?.acronym ?? 'PT'}</strong>
					<SrOnly>{__('changeLocale')}</SrOnly>
				</Button>
			</Dropdown.Trigger>

			<Dropdown.Portal>
				<DropdownMenu sideOffset={8}>
					{languagesAvailable.map((lang) => (
						<DropdownItem
							key={lang.prefix}
							active={currentLocale === lang.prefix}
							asChild
						>
							<Link href="/" locale={lang.prefix}>
								{lang.title}
							</Link>
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown.Portal>
		</Dropdown.Root>
	)
}
