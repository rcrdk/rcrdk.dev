import { useTranslations } from 'next-intl'

import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'

export function Contact() {
	const __ = useTranslations('Contact')

	return (
		<Section>
			<h2 className="layout:mb-8 mb-8 sm:mb-12">
				<SplitText
					text={__('title')}
					delay={50}
					className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white"
				/>
			</h2>

			<div className="layout:mt-8 mt-8 sm:mt-12">
				<p>Introdução com e-mail</p>
				<p>Botões de redes sociais</p>
				<p>Inserir o CV aqui?</p>
			</div>
		</Section>
	)
}
