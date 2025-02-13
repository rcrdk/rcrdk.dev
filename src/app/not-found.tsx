import AnimatedContent from '@/components/animated/animated-content'
import FollowCursor from '@/components/animated/follow-cursor'
import SplitText from '@/components/animated/split-text'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

import '@/styles/globals.css'

import { IconArrowLeft } from '@tabler/icons-react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

export default async function NotFound() {
	const messages = await getMessages()

	const gifs = [
		'https://media1.tenor.com/m/kSiC-0wGr4kAAAAC/monkey-technology.gif',
		'https://media1.tenor.com/m/M0na3YR-rTcAAAAd/enter-dev.gif',
		'https://media1.tenor.com/m/U69jGDWAjzsAAAAC/bis-125.gif',
		'https://media1.tenor.com/m/O33wFfiHweMAAAAd/break-smash.gif',
		'https://media1.tenor.com/m/UrOzKURAe4MAAAAd/dog-uncomfortable.gif',
		'https://media1.tenor.com/m/jbALD-i_9V8AAAAd/m%C3%A1rcia-sbt.gif',
		'https://media1.tenor.com/m/jZSWRcuhgV0AAAAd/pandlr-gretchen.gif',
		'https://media1.tenor.com/m/OKdC1U7Ma7MAAAAd/clodovil-straight-face.gif',
		'https://media1.tenor.com/m/NI3cA2KgJMoAAAAd/ines-brasil-lingua.gif',
		'https://media1.tenor.com/m/Q9oQu6dJwYwAAAAd/tulla-luana-tulla.gif',
		'https://media1.tenor.com/m/lTcMVpQWApAAAAAd/silvia-duas-caras.gif',
		'https://media1.tenor.com/m/WbLHCtYa5iEAAAAd/gloria-maria-shade.gif',
		'https://media1.tenor.com/m/CsRwaeb1ONUAAAAd/gloria-maria-gl%C3%B3ria-maria-matta-da-silva.gif',
		'https://media1.tenor.com/m/oGuA7Ahb3RIAAAAd/pandlr-lemonadetour.gif',
		'https://media1.tenor.com/m/6bZK0OnaKacAAAAd/pandlr-deb.gif',
	]

	const randomGif = gifs[Math.floor(Math.random() * gifs.length)]

	const __ = await getTranslations('Default')

	return (
		<html
			translate="no"
			className="text-content-light dark:text-content-dark layout:overflow-hidden w-full scroll-smooth bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body className="text-content-light dark:text-content-dark layout:overflow-y-auto layout:h-dvh w-full overflow-x-hidden scroll-smooth">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="data-mode">
						<FollowCursor
							backgroundImage={randomGif}
							rotationFactor={50}
							cardWidth="400px"
							offsetX={-200}
							offsetY={-200}
							className="pointer-events-none fixed inset-1/2 z-[40] opacity-0 transition-opacity duration-500 in-hover:!opacity-100"
						/>

						<div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6">
							<h2 className="font-heading pr-4 text-[50vw] leading-none tracking-tighter sm:text-[40vw] md:text-[33vw] lg:text-[25vw] dark:text-white [&>span>span>span:last-child]:!hidden">
								<SplitText text="404" delay={200} />
							</h2>

							<AnimatedContent className="relative z-50">
								<Button
									as={Link}
									href="/"
									className="max-xs:w-[90vw] !h-14 font-medium backdrop-blur-sm md:!h-16"
									size="lg"
									variant="outline"
								>
									<IconArrowLeft />
									{__('404')}
								</Button>
							</AnimatedContent>
						</div>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
