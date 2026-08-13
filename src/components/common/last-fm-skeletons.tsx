const SKELETON_BASE_CLASSNAME = 'animate-pulse rounded-sm bg-black/10 [animation-duration:1s] dark:bg-white/15'

interface LastFmSkeletonsProps {
	quantity: number
}

export function LastFmSkeletons({ quantity }: Readonly<LastFmSkeletonsProps>) {
	return Array.from({ length: quantity }).map((_, index) => (
		<div className="flex items-center gap-3 py-2.5 pr-5 pl-3" key={`last-fm-skeleton-${index}`}>
			<div className={`size-10 ${SKELETON_BASE_CLASSNAME}`} />
			<div className="flex flex-col items-start gap-2">
				<span className={`block h-3 w-72 ${SKELETON_BASE_CLASSNAME}`} />
				<span className={`block h-2 w-52 ${SKELETON_BASE_CLASSNAME}`} />
			</div>
		</div>
	))
}
