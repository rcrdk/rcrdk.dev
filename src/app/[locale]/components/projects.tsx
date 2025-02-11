import { useTranslations } from 'next-intl'

import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'

export function Projects() {
	const __ = useTranslations('Projects')

	return (
		<Section>
			<h2 className="layout:mb-8 xs:pr-0 lg:mb-12">
				<SplitText
					text={__('title')}
					delay={50}
					className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white"
				/>
			</h2>
		</Section>
	)
}
