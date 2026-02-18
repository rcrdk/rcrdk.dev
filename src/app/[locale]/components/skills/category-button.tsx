import AnimatedContent from '@/components/animated/animated-content'
import { SkillCategories } from '@/data/skills'
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
			<button
				className={cn(
					'xs:px-4 xs:text-xs rounded-2xl border px-3 py-2 text-[0.63rem] leading-none font-bold tracking-tight whitespace-nowrap uppercase transition-all select-none',
					selected &&
						'bg-content-light dark:bg:white pointer-events-none border-transparent text-white dark:bg-white dark:text-black',
					!selected &&
						'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 active:scale-85 active:duration-150 dark:border-white/15 dark:hover:border-white dark:hover:text-white',
				)}
				tabIndex={tabIndex}
				onClick={onSelect}
			>
				{category.title}
			</button>
		</AnimatedContent>
	)
}
