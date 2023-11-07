import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
export default create(
	subscribeWithSelector((set) => {
		return {
			/**
			 * isOpen
			 */
			isOpen: false,
			toggle: () => {
				set((state) => {
					// console.log('yo')
					return { isOpen: !state.isOpen }
				})
			},
		}
	})
)
