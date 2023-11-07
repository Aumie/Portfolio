import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
export default create(
	subscribeWithSelector((set) => {
		return {
			/**
			 * Position
			 */
			position: { x: 0, y: 0 },
			update: (position) => {
				set((state) => {
					// console.log(position)
					return { position }
				})
			},
		}
	})
)
