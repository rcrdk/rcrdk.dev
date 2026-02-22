import { IconArrowRight } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	heading: string
	text: string
	buttonText?: string
	handleSlideNext?: () => void
}

export function HistoryCommonIntro({ heading, text, buttonText, handleSlideNext, ...props }: Readonly<Props>) {
	return (
		<div {...props}>
			<h2 className="layout:mb-8 font-heading mb-8 block items-center text-5xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl md:max-w-full lg:static lg:block lg:h-auto lg:pr-0 lg:text-6xl dark:text-white">
				{heading}
			</h2>

			<p
				className="xs:text-lg text-md xs:leading-loose layout:pl-0 mb-0 leading-[1.8] text-pretty md:pl-40"
				dangerouslySetInnerHTML={{ __html: text }}
			/>

			{buttonText && (
				<Button variant="solid" className="layout:mt-8 mt-8 sm:mt-12" onClick={handleSlideNext}>
					{buttonText}
					<IconArrowRight aria-hidden />
				</Button>
			)}
		</div>
	)
}
