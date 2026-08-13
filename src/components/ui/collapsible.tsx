import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react'
import { Content, Root, Trigger } from '@radix-ui/react-collapsible'

import { cn } from '@/utils'

const Collapsible = Root
const CollapsibleTrigger = Trigger

const CollapsibleContent = forwardRef<ComponentRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
	({ className, ...props }, ref) => (
		<Content
			ref={ref}
			className={cn(
				'data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden',
				className,
			)}
			{...props}
		/>
	),
)

CollapsibleContent.displayName = Content.displayName

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
