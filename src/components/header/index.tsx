import * as Avatar from '@radix-ui/react-avatar'
import { useTranslations } from 'next-intl'

import avatarImage from '@/assets/avatar.jpg'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'

import HeaderColorMode from '../header-color-mode'
import HeaderLocale from '../header-locale'
import {
	BrandAvatar,
	BrandContainer,
	HeaderButtons,
	HeaderContainer,
} from './styles'

export default function Header() {
	const __ = useTranslations('Default')

	return (
		<HeaderContainer>
			<Container>
				<BrandContainer>
					<BrandAvatar>
						<Avatar.Image src={avatarImage.src} alt={__('avatarAlt')} />
					</BrandAvatar>
					<Heading as="span" mode="h3">
						rcrdk<span>.dev</span>
					</Heading>
				</BrandContainer>

				<HeaderButtons>
					<HeaderLocale />
					<HeaderColorMode />
				</HeaderButtons>
			</Container>
		</HeaderContainer>
	)
}
