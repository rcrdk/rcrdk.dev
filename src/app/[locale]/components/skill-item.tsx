import { useLocale } from 'next-intl'

import { SkillObject } from '@/data/skills'
import { LocalesType } from '@/i18n/routing'

type Props = {
	skill: SkillObject
}

export function SkillItem({ skill }: Props) {
	const locale = useLocale()

	return (
		<p className="xs:text-base xs:py-1 xs:gap-2 flex items-center gap-1 rounded-xl border border-black/15 bg-black/3 px-2 py-2 text-sm text-black select-none dark:border-white/15 dark:bg-white/10 dark:text-white">
			{skill.icon && (
				<span className="xs:size-5 xs:[&_svg]:size-5 block size-4 [&_svg]:size-4 [&_svg]:fill-current">
					{skill.icon}
				</span>
			)}
			<span className="xs:leading-normal xs:pe-1 block leading-none font-medium">
				{skill.title[locale as LocalesType]}
			</span>
		</p>
	)
}
