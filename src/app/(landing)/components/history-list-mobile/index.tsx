import { HistoryListMobileItem } from '@/app/(landing)/components/history-list-mobile/item'
import { HistoryCommonIntro } from '@/app/(landing)/components/intro'
import { AnimatedContent } from '@/components/animated/animated-content'
import type { HistoryItem } from '@/types/history'

interface Props {
	title: string
	text: string
	list: HistoryItem[]
}

export function HistoryListMobile({ title, text, list }: Readonly<Props>) {
	return (
		<>
			<AnimatedContent>
				<HistoryCommonIntro heading={title} text={text} />
			</AnimatedContent>

			{list.map((item) => (
				<AnimatedContent key={item.id}>
					<HistoryListMobileItem data={item} />
				</AnimatedContent>
			))}
		</>
	)
}
