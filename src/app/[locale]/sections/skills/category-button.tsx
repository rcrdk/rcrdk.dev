import { MotionButton, MotionDiv } from '@/components/animated/motion'
import { DEFAULT_MOTION_SPRING_CONFIG } from '@/config/motion'
import type { SkillCategories } from '@/data/skills'
import { cn } from '@/utils/tailwind-cn'

type Category = {
	id: SkillCategories
	title: string
}

interface Props {
	category: Category
	selected: boolean
	onSelect: VoidFunction
}

export function SkillCategoryButton({ category, selected, onSelect }: Readonly<Props>) {
	const tabIndex = selected ? -1 : 0

	return (
		<MotionButton
			className={cn(
				'xs:px-4 xs:text-sm squircle-rounded relative flex min-w-0 shrink-0 rounded-2xl px-3.5 py-2.5 text-xs leading-none font-medium tracking-tight whitespace-nowrap transition-all duration-300 outline-none select-none',
				selected && 'pointer-events-none text-black dark:text-white',
				!selected &&
					'cursor-pointer text-black/60 outline-none hover:text-black focus-visible:ring-2 focus-visible:ring-black/10 dark:text-white/50 dark:hover:text-white dark:focus-visible:ring-white/30',
			)}
			tabIndex={tabIndex}
			onClick={onSelect}
			initial={false}
			animate={{ opacity: selected ? 1 : 0.8 }}
			transition={DEFAULT_MOTION_SPRING_CONFIG}
		>
			{selected && (
				<MotionDiv
					layoutId="category-background"
					className="squircle-rounded absolute inset-0 !z-1 rounded-2xl border border-black/15 bg-white dark:border-white/15 dark:bg-white/20"
					transition={DEFAULT_MOTION_SPRING_CONFIG}
				/>
			)}
			<span className="relative z-10">{category.title}</span>
		</MotionButton>
	)
}
