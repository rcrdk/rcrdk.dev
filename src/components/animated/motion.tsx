import type { ComponentProps } from 'react'
import { motion } from 'motion/react'

type MotionDivProps = ComponentProps<typeof motion.div>
export const MotionDiv = (props: MotionDivProps) => <motion.div {...props} />

type MotionButtonProps = ComponentProps<typeof motion.button>
export const MotionButton = (props: MotionButtonProps) => <motion.button {...props} />

type MotionSpanProps = ComponentProps<typeof motion.span>
export const MotionSpan = (props: MotionSpanProps) => <motion.span {...props} />
