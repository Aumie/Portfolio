import { motion } from 'framer-motion'
import useSidebar from '../../Stores/useSidebar'

export default function ToggleButton() {
	const toggle = useSidebar((state) => state.toggle)
	return (
		<button onClick={() => toggle()}>
			<svg width='24' height='24' viewBox='0 0 24 24'>
				<motion.path
					strokeWidth='3'
					stroke='black'
					strokeLinecap='round'
					variants={{
						closed: { d: 'M 2 2.5 L 20 2.5' },
						open: { d: 'M 3 16.5 L 17 2.5' },
					}}
				/>
				<motion.path
					strokeWidth='3'
					stroke='black'
					strokeLinecap='round'
					d='M 2 9.423 L 20 9.423'
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 },
					}}
				/>
				<motion.path
					strokeWidth='3'
					stroke='black'
					strokeLinecap='round'
					variants={{
						closed: { d: 'M 2 16.346 L 20 16.346' },
						open: { d: 'M 3 2.5 L 17 16.346' },
					}}
				/>
			</svg>
		</button>
	)
}
