import { useTranslations } from 'next-intl'

import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'

export function Trajectory() {
	const __ = useTranslations('Trajectory')

	return (
		<Section>
			<h2 className="layout:mb-8 mb-8 sm:mb-12">
				<SplitText
					text={__('title')}
					delay={50}
					className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white"
				/>
			</h2>

			<div>
				<p>Texto introdutório</p>
				<p>Listar experiências profissionais</p>
				<p>Listar formações e cursos</p>
				<p>Card: Linkedin + CV</p>
			</div>
		</Section>
	)
}
