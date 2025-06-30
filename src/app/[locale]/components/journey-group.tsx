import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronDown } from '@tabler/icons-react'

import { JourneyExperience } from '@/app/[locale]/components/journey'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	title: string
	items: JourneyExperience[]
	open: boolean
	onOpenChange: VoidFunction
}

export function JourneyGroup({ title, items, open, onOpenChange }: Props) {
	return (
		<div>
			<button
				className={cn(
					'group w-full text-start transition-all outline-none',
					open ? 'pt-8 pb-0' : 'cursor-pointer pt-4 pb-4',
				)}
				tabIndex={open ? -1 : 0}
				onClick={onOpenChange}
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
				<Collapsible.Content className="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden">
					<ul className="flex flex-col gap-8 py-12 pl-1 md:pl-0">
						{items.map((item, index) => (
							<li key={index}>
								<div className="grid grid-cols-[auto_1fr] md:grid-cols-[10rem_1px_1fr]">
									<div className="order-3 shrink-0 pb-3 pl-6 md:sticky md:top-4 md:order-1 md:row-span-2 md:w-44 md:self-start md:pr-3 md:pb-0 md:pl-0">
										<a
											href={item.url}
											target="_blank"
											className="mr-1 block hover:underline md:mr-0 md:mb-1 md:block md:font-bold md:after:hidden dark:text-white"
										>
											{item.company}
										</a>

										<p className="inline-block text-sm leading-tight text-black/85 after:mx-2 after:not-italic after:content-['|'] max-md:italic md:mr-0 md:block md:after:hidden dark:text-white/70 dark:md:text-white/55">
											{item.time_range}
										</p>

										<p className="inline-block text-sm leading-tight text-black/85 max-md:italic md:mr-0 md:block dark:text-white/70 dark:md:text-white/55">
											{item.location}
										</p>
									</div>

									<span className="relative order-1 row-span-3 block w-px shrink-0 md:order-2 md:row-span-2">
										<span
											className={cn(
												'absolute top-0 -bottom-8 left-0 block w-px bg-black/10 dark:bg-white/15',
												index === 0 ? 'top-2.5' : 'top-0',
												index === items.length - 1 ? 'bottom-0' : '-bottom-8',
											)}
										/>
										<span className="bg-accent-blue absolute top-2.5 -left-1 block size-2 rounded-full" />
									</span>

									<h4 className="text-md order-2 pl-6 font-bold text-pretty md:order-3 md:mb-2 md:text-lg md:font-semibold dark:text-white">
										{item.title}
									</h4>

									<div className="order-3 grow pl-6">
										<ul className="dark:text-content-dark text-content-light list-disc pl-4 text-sm text-pretty sm:text-base">
											{item.info.map((detail, n) => (
												<li key={n}>{detail}</li>
											))}
										</ul>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	)
}
