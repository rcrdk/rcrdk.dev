import { GetStaticPropsContext } from 'next'

export { default } from '@/pages/home'

export async function getStaticProps(context: GetStaticPropsContext) {
	return {
		props: {
			messages: (await import(`@/content/${context.locale}.json`)).default,
		},
	}
}
