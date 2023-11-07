import { useEffect, useState } from 'react'
import { delay, motion } from 'framer-motion'
import './cursor.css'
import useCursor from '../../Stores/useCursor'
export default function Cursor() {
	const [position, setPosition] = useState({ x: -10, y: -10 })
	const [scale, setScale] = useState(1)
	const updateCursor = useCursor((state) => state.update)

	useEffect(() => {
		const mouseMove = (e) => {
			const pos = { x: e.clientX, y: e.clientY }
			setPosition(pos)
			updateCursor(pos)
		}
		const mouseUp = (e) => setScale(1)
		const mouseDown = (e) => setScale(1.3)

		window.addEventListener('mousemove', mouseMove)
		window.addEventListener('mouseup', mouseUp)
		window.addEventListener('mousedown', mouseDown)
		return () => {
			window.removeEventListener('mousemove', mouseMove)
			window.removeEventListener('mouseup', mouseUp)
			window.removeEventListener('mousedown', mouseDown)
		}
	}, [])
	const transition = {
		type: 'linear',
		damping: 10,
		stiffness: 10,
		duration: 0.05,
	}
	return (
		<motion.div
			className='cursor'
			animate={{
				x: position.x - 9,
				y: position.y - 9,
				scale: scale,
			}}
			transition={transition}
		></motion.div>
	)
}
