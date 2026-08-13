import { toast } from 'sonner'

import { GameToast } from '@/components/game/toast'
import type { GameTaskUser } from '@/types/game'

const TOAST_DURATION = 20000

export const notifyCompletedTask = (task: GameTaskUser) => {
	toast(<GameToast task={task} />, {
		id: task.id,
		position: 'top-center',
		duration: TOAST_DURATION,
	})
}
