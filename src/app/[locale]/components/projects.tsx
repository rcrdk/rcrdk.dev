'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import SplitText from '@/components/animated/split-text'
import { Section } from '@/components/ui/section'
import { cn } from '@/utils/tailwind-cn'

type Category =
	| 'highlights'
	| 'websites'
	| 'web_apps'
	| 'landing_pages'
	| 'ecommerces'
	| 'mobile_apps'

type CategoryDTO = {
	id: Category
	label: string
}

export function Projects() {
	const [category, setCategory] = useState<Category>('highlights')

	const __ = useTranslations('Projects')
	const categories = __.raw('categories') as CategoryDTO[]

	const handleChangeCategory = useCallback((id: Category) => {
		setCategory(id)
	}, [])

	return (
		<Section>
			<h2 className="layout:mb-8 mb-8 sm:mb-12">
				<SplitText
					text={__('title')}
					delay={50}
					className="font-heading block text-5xl font-black tracking-tight text-balance sm:text-7xl lg:text-6xl dark:text-white"
				/>
			</h2>

			<div className="flex flex-wrap gap-2">
				{categories.map((item) => (
					<button
						key={item.id}
						className={cn(
							'xs:py-2 xs:px-4 rounded-2xl border px-5 py-2 text-xs leading-none font-bold tracking-tight whitespace-nowrap uppercase transition-all',
							category === item.id &&
								'bg-content-light pointer-events-none border-transparent text-white dark:bg-white dark:text-black',
							category !== item.id &&
								'focus-visible:border-accent-blue focus-visible:bg-accent-blue/10 focus-visible:text-accent-blue focus-visible:ring-accent-blue/40 cursor-pointer border-black/20 outline-none hover:border-black focus-visible:ring-4 dark:border-white/25 dark:hover:border-white dark:hover:text-white',
						)}
						tabIndex={category === item.id ? -1 : 0}
						onClick={() => handleChangeCategory(item.id)}
					>
						{item.label}
					</button>
				))}
			</div>

			<div className="layout:mt-8 mt-8 sm:mt-12">
				<p>
					Usar JSOn Server:
					https://github.com/kitloong/json-server-vercel/tree/main
				</p>
				<p>Listar projetos filtrados</p>
				<p>Criar descrição para cada categoria?</p>
				<p>Thumbnail em video/imagem</p>
				<p>Nome</p>
				<p>Descrição</p>
				<p>Tags</p>
				<p>Links: Repo / Behance / Produção</p>
			</div>
		</Section>
	)
}
