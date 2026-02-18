import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/tailwind-cn'

const baseVariants = cva('w-full max-w-full', {
	variants: {
		sideSpacing: {
			base: 'xs:px-6 px-4 sm:px-8 md:px-10',
			lg: 'xs:px-12 px-6 sm:px-16 md:px-20',
		},
	},
})

const containerVariants = cva('w-full', {
	variants: {
		size: {
			fluid: 'max-w-full',
			center: 'mx-auto max-w-[768px]',
		},
	},
})

type BaseVariantsProps = VariantProps<typeof baseVariants>
type ContainerVariantsProps = VariantProps<typeof containerVariants>

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: ContainerVariantsProps['size']
	sideSpacing?: BaseVariantsProps['sideSpacing']
	classNameCenter?: React.HTMLAttributes<HTMLDivElement>['className']
}
export function Container({
	size = 'fluid',
	sideSpacing = 'base',
	classNameCenter,
	...props
}: Readonly<ContainerProps>) {
	return (
		<div {...props} className={cn(baseVariants({ sideSpacing }), props.className)}>
			<div className={cn(containerVariants({ size }), classNameCenter)}>{props.children}</div>
		</div>
	)
}
