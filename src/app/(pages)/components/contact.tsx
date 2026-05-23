'use client'

import { IconBrandLinkedin, IconFileDescription } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { LINKS } from '@/config/links'
import { BUTTONS, DEFAULT_BUTTON_PROPS, EXTERNAL_BUTTON_LINK_PROPS } from '@/constants/contact'

export function PageContact() {
	const __ = useTranslations('Contact')

	return (
		<div className="mx-auto max-w-[768px] py-[16vw] lg:py-[9vw]">
			<h2 className="font-heading xs:text-5xl mb-8 block text-4xl font-black tracking-tight text-balance sm:mb-12 sm:text-7xl lg:text-6xl dark:text-white">
				{__('pagesTitle')}
			</h2>

			<div className="mt-8 sm:mt-12">
				<p
					className="text-lg text-balance md:pl-40 [&_a]:underline"
					dangerouslySetInnerHTML={{ __html: __.raw('text') }}
				/>

				<ul className="mt-16 flex flex-wrap gap-2 sm:gap-3">
					{BUTTONS.map(({ labelKey, href, Icon }) => (
						<li key={labelKey}>
							<Button {...EXTERNAL_BUTTON_LINK_PROPS} href={href} aria-label={__(`buttons.${labelKey}`)}>
								<Icon aria-hidden />
							</Button>
						</li>
					))}

					<li className="w-full grow self-center sm:w-auto">
						<hr className="mx-6 my-6 h-12 grow self-center border-t-0 border-l border-black/10 sm:mx-0 sm:h-auto sm:border-t sm:border-l-0 lg:mx-5 lg:my-0 dark:border-white/15" />
					</li>
				</ul>

				<div className="squircle-rounded flex items-center gap-6 rounded-2xl bg-black/5 p-5 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4 sm:mt-16 dark:bg-white/10">
					<p className="text-content-light/75 dark:text-content-dark/75 xs:text-start grow text-center text-[15px] text-balance">
						{__('box.text')}
					</p>

					<div className="xs:w-auto flex w-full gap-2">
						<Button {...DEFAULT_BUTTON_PROPS} href={LINKS.linkedIn}>
							<IconBrandLinkedin aria-hidden />
							<span className="font-semibold">{__('box.button.linkedin')}</span>
						</Button>

						<Button {...DEFAULT_BUTTON_PROPS} href={LINKS.resume}>
							<IconFileDescription aria-hidden />
							<span className="font-semibold">{__('box.button.cv')}</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
