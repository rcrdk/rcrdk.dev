type Props = {
	children: React.ReactNode
}

export function Section({ children }: Props) {
	return (
		<section className="layout:snap-start layout:min-h-dvh flex w-full [&_div]:max-w-full">
			<div className="xs:py-18 my-auto w-full py-14 sm:py-20">{children}</div>
		</section>
	)
}
