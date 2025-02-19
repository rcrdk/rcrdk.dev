type Props = {
	id: string
}

export function Anchor({ id }: Props) {
	return (
		<div className="relative !border-0">
			<div id={id} className="xs:top-0 absolute -top-[73px]" />
		</div>
	)
}
