import { memo } from 'react'
import { IconCirclePlus, IconPhotoOff } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Image } from '@/components/ui/image'
import { ProjectTranslatedObject } from '@/data/projects'

type Props = {
	project: ProjectTranslatedObject
	onOpenChange: VoidFunction
}

function ProjectItemComponent({ project, onOpenChange }: Props) {
	const __ = useTranslations('Projects')

	const ariaLabel = __('ariaLabels.viewProject', { title: project.title })

	return (
		<button
			className="group focus-visible:before:border-accent-blue focus-visible:ring-accent-blue/40 hover:before:border-content-light relative flex min-h-full w-full shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl text-start outline-none before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-xl before:border before:border-black/20 before:transition-colors focus-visible:ring-4 dark:bg-white/5 dark:before:border-white/15 dark:hover:before:border-white/50"
			onClick={onOpenChange}
			aria-label={ariaLabel}
		>
			<div className="group-hover:before:border-content-light relative flex aspect-[4/3.15] w-full overflow-hidden before:absolute before:inset-x-px before:bottom-0 before:z-[1] before:border-t before:border-black/20 before:transition-colors dark:before:border-white/15 dark:group-hover:before:border-white/50">
				{project.image && <Image src={project.image} alt={`${project.title} - ${project.intro}`} />}
				{!project.image && <IconPhotoOff className="m-auto size-20 stroke-1 opacity-20" aria-hidden />}
			</div>

			<div className="relative flex w-full grow flex-col p-4">
				<h3 className="mb-2 line-clamp-2 text-base leading-tight font-bold text-balance dark:text-white">
					{project.title}
				</h3>

				<p className="mb-4 line-clamp-3 text-sm text-pretty text-black/60 dark:text-white/50">{project.intro}</p>

				<span className="mt-auto flex items-center gap-1">
					<IconCirclePlus className="size-5" aria-hidden />
					<span className="text-sm font-bold">{__('action')}</span>
				</span>
			</div>
		</button>
	)
}

export const ProjectItem = memo(ProjectItemComponent)
