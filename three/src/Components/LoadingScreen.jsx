import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
	const { progress } = useProgress()
	const [adjustProg, setAdjustProg] = useState(0)

	useEffect(() => {
		if (adjustProg < progress) setAdjustProg(progress)
	}, [progress])

	return (
		<div
			style={{
				fontFamily: 'Major Mono Display, monospace',
				margin: 'auto',
				fontSize: '50px',
				color: 'white',
			}}
		>
			<h1>{adjustProg.toFixed(0)} %</h1>
		</div>
	)
}
