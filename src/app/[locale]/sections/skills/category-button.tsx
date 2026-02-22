import { AnimatedContent } from '@/components/animated/animated-content'
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
		<AnimatedContent>
			<MotionButton
				className={cn(
					'xs:px-4 xs:text-xs squircle-rounded relative rounded-2xl border px-3 py-2 text-[0.63rem] leading-none font-bold tracking-tight whitespace-nowrap uppercase transition-all duration-400 select-none',
					selected && 'pointer-events-none border-transparent text-white dark:text-black',
					!selected &&
						'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 dark:border-white/15 dark:hover:border-white dark:hover:text-white',
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
						className="bg-content-light squircle-rounded absolute inset-0 -z-10 rounded-2xl dark:bg-white"
						transition={DEFAULT_MOTION_SPRING_CONFIG}
					/>
				)}
				<span className="relative z-10">{category.title}</span>
			</MotionButton>
		</AnimatedContent>
	)
}
