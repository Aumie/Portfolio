import { motion } from 'framer-motion'
import Links from './Links'
import ToggleButton from './ToggleButton'
import './sidebar.scss'
import useSidebar from '../../Stores/useSidebar'

const variants = {
	open: {
		clipPath: 'circle(1400px at calc(100% - 48px) 50px)',
		transition: {
			type: 'spring',
			stiffness: 20,
		},
	},
	closed: {
		clipPath: 'circle(20px at calc(100% - 48px) 50px)',
		transition: {
			delay: 0.25,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
}

export default function Sidebar() {
	const isOpen = useSidebar((state) => state.isOpen)
	return (
		<motion.div className='sidebar' animate={isOpen ? 'open' : 'closed'}>
			<motion.div className='bg' variants={variants} initial={false}>
				<Links />
			</motion.div>
			<ToggleButton />
		</motion.div>
	)
}
