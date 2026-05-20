import { Image } from '@/components/ui/image'
import type { LocalesType } from '@/i18n/routing'
import { formatList } from '@/utils/format-list'
import type { ProjectWithAttribution } from '@/utils/get-project-attributions'

interface Props {
	data: ProjectWithAttribution
	locale: LocalesType
}

export function ProjectDrawerEntity({ data, locale }: Readonly<Props>) {
	return (
		<a href={data.url} target="_blank" rel="noopener noreferrer" className="group/project-drawer-entity flex gap-2.5">
			<div className="squircle-rounded relative size-12 self-start overflow-hidden rounded-xl bg-white shadow">
				<Image
					src={data.avatarUrl}
					alt={data.name}
					fill
					sizes="96px"
					className="transition-transform duration-400 group-hover/project-drawer-entity:scale-115"
				/>
			</div>

			<div className="self-center">
				<p className="mb-0.5 text-base leading-none font-semibold dark:text-white">{data.name}</p>
				<p className="text-sm text-black/50 dark:text-white/50">{formatList(data.roles, locale)}</p>
			</div>
		</a>
	)
}
