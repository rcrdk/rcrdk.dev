import { IconBrandBehance, IconBrandGithub, IconExternalLink } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperOptions } from 'swiper/types'

import { ProjectDrawerEntity } from '@/app/[locale]/components/project-drawer/entity'
import { ProjectDrawerGroup } from '@/app/[locale]/components/project-drawer/group'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHandler, DrawerTitle } from '@/components/ui/drawer'
import { Image } from '@/components/ui/image'
import { Skill } from '@/components/ui/skill'
import type { LocalesType } from '@/i18n/routing'
import type { HistoryProject } from '@/types/history'
import { formatList } from '@/utils/format-list'
import { getProjectAttributions } from '@/utils/get-project-attributions'
import { getProjectSkills } from '@/utils/get-project-skills'
import { cn } from '@/utils/tailwind-cn'

interface Props {
	data: HistoryProject
	open: boolean
	onOpenChange: (open: boolean) => void
}

const FREE_MODE_CONFIG: SwiperOptions['freeMode'] = {
	sticky: false,
	momentum: true,
	momentumBounce: true,
	minimumVelocity: 0.02,
	momentumBounceRatio: 1,
	momentumRatio: 1,
	momentumVelocityRatio: 1,
} as const

const SWIPER_CONFIG: SwiperOptions = {
	modules: [FreeMode],
	centeredSlides: false,
	freeMode: { enabled: true, ...FREE_MODE_CONFIG },
	slidesPerView: 'auto',
	spaceBetween: 16,
	breakpoints: {
		480: {
			spaceBetween: 24,
			centeredSlides: false,
			freeMode: { enabled: true, ...FREE_MODE_CONFIG },
		},
		640: {
			spaceBetween: 32,
			centeredSlides: true,
			freeMode: { enabled: false, ...FREE_MODE_CONFIG },
		},
		960: {
			spaceBetween: 60,
			centeredSlides: true,
			freeMode: { enabled: false, ...FREE_MODE_CONFIG },
		},
	},
} as const

const BUTTON_PROPS = {
	as: 'a',
	variant: 'outline',
	size: 'xs',
	icon: true,
	target: '_blank',
	rel: 'noopener noreferrer',
} as const

export function ProjectDrawer({ data, open, onOpenChange }: Readonly<Props>) {
	const locale = useLocale() as LocalesType
	const __ = useTranslations('Project')

	const { title, description } = data?.[locale] || {}

	const attributions = getProjectAttributions(data.attributions, locale)
	const skills = getProjectSkills(data)

	const hasGallery = data.gallery.length > 0
	const hasLinks = data.links.website || data.links.github || data.links.behance

	const drawerContentSize = hasGallery ? 'center' : 'center-small'
	const absoluteHandler = Boolean(!hasGallery || (data.image && !hasGallery))

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="[&>div]:bg-black/2" size={drawerContentSize}>
				<DrawerHandler
					className={cn('mb-0', !hasGallery && 'my-5 h-1 w-30')}
					style={data.handler}
					absolute={absoluteHandler}
				/>

				{!hasGallery && data.image && (
					<div className="relative aspect-101/79 w-full">
						<Image src={data.image} alt={title} fill sizes="66vw" className="size-full object-cover object-top" />
					</div>
				)}

				{hasGallery && (
					<Swiper
						{...SWIPER_CONFIG}
						className="w-full shrink-0 !overflow-visible !px-[5vw] !py-[9vw] lg:!px-[9vw] lg:!pt-[3vw] lg:!pb-0"
					>
						{data.gallery.map((item) => (
							<SwiperSlide
								key={item.url}
								className={cn('!h-auto', item.format === 'desktop' ? '!w-[150vw] sm:!w-full' : '!w-1/2 sm:!w-1/4')}
							>
								<div
									className={cn(
										'squircle-rounded relative h-full w-full overflow-hidden shadow-2xl',
										item.format === 'desktop' ? 'aspect-16/9' : 'aspect-9/16',
									)}
								>
									<Image
										src={item.url}
										alt={title}
										sizes="66vw"
										fill
										className="squircle-rounded w-full object-cover object-top"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				)}

				<div
					className={cn(
						'text-base',
						hasGallery && 'px-[7vw] pt-0 pb-[22vw] sm:text-lg lg:px-[9vw] lg:py-[5vw]',
						!hasGallery && 'px-8 pt-8 pb-12',
					)}
				>
					<DrawerTitle asChild>
						<h5
							className={cn(
								'font-heading mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl dark:text-white',
								!hasGallery && 'text-4xl md:text-3xl',
							)}
						>
							{title}
						</h5>
					</DrawerTitle>

					<p className="text-pretty text-black/75 dark:text-white/75">{description}</p>

					{description && (
						<hr
							className={cn(
								'border-black/15 dark:border-white/15',
								hasGallery && 'my-7 md:my-12',
								!hasGallery && 'my-7 md:my-6 xl:my-9',
							)}
						/>
					)}

					<div
						className={cn(
							'gap-6 xl:gap-y-9',
							hasGallery && 'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5',
							!hasGallery && 'flex flex-wrap',
						)}
					>
						<ProjectDrawerGroup
							hasGallery={hasGallery}
							title={__('team')}
							className={cn('row-span-3 max-md:order-2 sm:col-span-3 md:col-span-2', !hasGallery && 'order-2')}
						>
							<ul className="flex flex-col gap-3">
								{attributions.map((attribution) => (
									<li key={attribution.name}>
										<ProjectDrawerEntity data={attribution} locale={locale} />
									</li>
								))}
							</ul>
						</ProjectDrawerGroup>

						<ProjectDrawerGroup
							hasGallery={hasGallery}
							title={__('techStack')}
							className="sm:col-span-3 md:col-span-2 xl:col-span-3"
						>
							<div className="flex flex-wrap gap-1">
								{skills.map((skill) => (
									<Skill key={skill.title} skill={skill} />
								))}
							</div>
						</ProjectDrawerGroup>

						<ProjectDrawerGroup
							hasGallery={hasGallery}
							title={__('startYear')}
							className={cn(!hasGallery && 'w-auto grow')}
						>
							<p className="text-black/50 dark:text-white/50">{data.year}</p>
						</ProjectDrawerGroup>

						<ProjectDrawerGroup
							hasGallery={hasGallery}
							title={__('categories')}
							className={cn(!hasGallery && 'w-auto grow')}
						>
							<p className="text-black/50 dark:text-white/50">{formatList(data.categories, locale)}</p>
						</ProjectDrawerGroup>

						{hasLinks && (
							<ProjectDrawerGroup
								hasGallery={hasGallery}
								title={__('links')}
								className={cn(!hasGallery && 'w-auto grow')}
							>
								<div className="flex gap-2">
									{data.links.website && (
										<Button {...BUTTON_PROPS} href={data.links.website} title={__('website')}>
											<IconExternalLink aria-hidden />
										</Button>
									)}

									{data.links.github && (
										<Button {...BUTTON_PROPS} href={data.links.github} title={__('github')}>
											<IconBrandGithub aria-hidden />
										</Button>
									)}

									{data.links.behance && (
										<Button {...BUTTON_PROPS} href={data.links.behance} title={__('behance')}>
											<IconBrandBehance aria-hidden />
										</Button>
									)}
								</div>
							</ProjectDrawerGroup>
						)}
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
