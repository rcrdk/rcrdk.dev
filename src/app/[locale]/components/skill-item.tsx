import { useLocale } from 'next-intl'

import { SkillObject } from '@/data/skills'
import { LocalesType } from '@/i18n/routing'

type Props = {
	skill: SkillObject
}

export function SkillItem({ skill }: Props) {
	const locale = useLocale()

	return (
		<p className="xs:text-sm xs:py-1 xs:gap-2 flex items-center gap-1 rounded-xl border border-black/15 px-2 py-1 text-xs text-black select-none sm:text-base dark:border-white/15 dark:text-white">
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
