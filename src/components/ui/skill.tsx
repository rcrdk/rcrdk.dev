import type { SkillItem as SkillItemType } from '@/data/skills'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	skill: SkillItemType
}

export function Skill({ skill }: Readonly<Props>) {
	const { Icon, title, fill } = skill

	const shouldNotFill = fill === false

	return (
		<p className="squircle-rounded xs:text-sm xs:py-1 xs:gap-2 flex items-center gap-1 rounded-xl border border-black/15 px-2 py-1 text-xs text-black select-none sm:text-base dark:border-white/15 dark:text-white">
			<span className="xs:size-5 xs:[&_svg]:size-5 block size-4 [&_svg]:size-4 [&_svg]:fill-current">
				<Icon className={cn(shouldNotFill && '!fill-none')} />
			</span>

			<span className="xs:leading-normal xs:pe-1 block leading-none font-medium">{title}</span>
		</p>
	)
}
