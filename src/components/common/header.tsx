import Image from 'next/image'
import { useTranslations } from 'next-intl'

import avatarPicture from '@/assets/avatar.jpg'
import { LocaleSwitcher } from '@/components/common/locale-switcher'
import { ThemeSwitcher } from '@/components/common/theme-switcher'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/routing'

export function Header() {
	const t = useTranslations('Default')

	return (
		<header className="xs:pt-6 xs:pb-0 xs:static xs:border-b-0 sticky top-0 z-10 w-full border-b border-black/5 bg-white/90 pt-4 pb-4 text-black/85 backdrop-blur-xs select-none dark:border-white/10 dark:bg-black/90 dark:text-white">
			<Container classNameCenter="flex items-center justify-between">
				<Link
					href="/"
					className="xs:py-2 xs:pr-4 xs:pl-2 xs:gap-3 flex items-center gap-2 rounded-4xl py-1 pr-2 pl-1"
				>
					<Image
						src={avatarPicture}
						width={200}
						height={100}
						alt={t('avatarAlt')}
						className="xs:size-10 size-9 rounded-full"
					/>

					<span className="font-heading xs:text-3xl block -translate-y-0.5 text-2xl leading-none font-black tracking-tight">
						rcrdk
						<span className="text-accent-blue">.dev</span>
					</span>
				</Link>

				<div className="flex gap-2">
					<LocaleSwitcher />
					<ThemeSwitcher />
				</div>
			</Container>
		</header>
	)
}
