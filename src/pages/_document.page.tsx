import { Head, Html, Main, NextScript } from 'next/document'

import { getCssText } from '@/styles'

export default function Document() {
	return (
		<Html prefix="og: http://ogp.me/ns#">
			<Head>
				<style
					id="stitches"
					dangerouslySetInnerHTML={{ __html: getCssText() }}
				/>
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
