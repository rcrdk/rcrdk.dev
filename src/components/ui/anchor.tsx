type Props = {
	id: string
}

export function Anchor({ id }: Props) {
	return (
		<div className="relative">
			<div id={id} className="xs:top-0 absolute -top-[79px]" />
		</div>
	)
}
