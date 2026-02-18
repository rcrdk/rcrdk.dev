import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronDown } from '@tabler/icons-react'

import { JourneyExperience } from '@/app/[locale]/components/journey'
import { JourneyItem } from '@/app/[locale]/components/journey/item'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	title: string
	items: JourneyExperience[]
	open: boolean
	onOpenChange: VoidFunction
}

export function JourneyGroup({ title, items, open, onOpenChange }: Props) {
	const contentId = `journey-${title.toLowerCase().replace(/\s+/g, '-')}`
	const tabIndex = open ? -1 : 0

	return (
		<div>
			<button
				className={cn(
					'group w-full text-start transition-all outline-none',
					open && 'pt-8 pb-0',
					!open && 'cursor-pointer pt-4 pb-4',
				)}
				tabIndex={tabIndex}
				onClick={onOpenChange}
				aria-expanded={open}
				aria-controls={contentId}
			>
				<h3 className="font-heading flex items-center justify-between gap-4 text-2xl tracking-tight dark:text-white">
					{title}

					<span
						className={cn(
							'flex size-8 shrink-0 items-center justify-center rounded-full border border-transparent bg-black/5 transition-all',
							'group-focus-visible:!border-accent-blue group-focus-visible:bg-accent-blue/10 dark:group-focus-visible:bg-accent-blue/20 group-focus-visible:ring-accent-blue/40 group-focus-visible:text-accent-blue group-focus-visible:ring-4',
							'group-hover:bg-black/10 dark:bg-white/10 dark:group-hover:bg-white/15',
							open && 'opacity-0',
						)}
					>
						<IconChevronDown aria-hidden />
					</span>
				</h3>
			</button>

			<Collapsible.Root open={open} onOpenChange={onOpenChange}>
				<Collapsible.Content
					id={contentId}
					className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden"
				>
					<ul className="flex flex-col gap-8 py-12 pl-1 md:pl-0">
						{items.map((item, index) => (
							<JourneyItem key={index} item={item} index={index} total={items.length} />
						))}
					</ul>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	)
}
