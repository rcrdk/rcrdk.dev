import type { SkillItem as SkillItemType } from '@/data/skills'
import { cn } from '@/utils/tailwind-cn'

interface Props {
	skill: SkillItemType
	label?: string
}

export function Skill({ skill, label }: Readonly<Props>) {
	const { Icon, title, fill } = skill
	const displayTitle = label ?? title

	const shouldNotFill = fill === false

	return (
		<p className="squircle-rounded xs:py-1 xs:gap-1 flex items-center gap-0.5 rounded-xl border border-black/15 px-2 py-1 text-sm text-black select-none sm:text-base dark:border-white/15 dark:text-white">
			<span className="xs:size-5 xs:[&_svg]:size-5 block size-4 [&_svg]:size-4 [&_svg]:fill-current">
				<Icon className={cn(shouldNotFill && '!fill-none')} />
			</span>

			<span className="xs:leading-normal xs:pe-1 block leading-none font-medium">{displayTitle}</span>
		</p>
	)
}
