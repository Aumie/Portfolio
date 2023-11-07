import * as THREE from 'three'
import { useEffect, useRef, useState, Suspense } from 'react'
import Frame from './Frame'
import { MeshReflectorMaterial, useTexture } from '@react-three/drei'

export default function FavoriteWork() {
	return (
		<Frame
			link='favoritework'
			name={`Favorite\nwork`}
			bg='#e4cdac'
			position={[-1.15, 0, 0]}
			// rotation={[0, 0.5, 0]}
			rotation={[0, 0, 0]}
			headerSize={0.15}
			camTargetPos={[-3, -1, -1]}
		>
			<color attach='background' args={['black']} />
			<fog attach='fog' args={['black', 8, 11]} />
			<Suspense fallback={null}>
				<group position={[-3.1, -2.6, -0.9]}>
					<Screen position={[0, 0.2, -1]} />
					<Ground />
				</group>
				<ambientLight intensity={0.5} />
				<spotLight position={[0, 10, 0]} intensity={0.3} />
				<directionalLight position={[-50, 0, -40]} intensity={0.7} />
			</Suspense>
		</Frame>
	)
}

function Ground() {
	const [floor, normal] = useTexture([
		'./textures/SurfaceImperfections003_1K_var1.jpg',
		'./textures/SurfaceImperfections003_1K_Normal.jpg',
	])
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
			<circleGeometry args={[16, 16]} />
			<MeshReflectorMaterial
				blur={[400, 100]}
				resolution={512}
				mirror={0.5}
				mixBlur={6}
				mixStrength={1.5}
				color='#a0a0a0'
				metalness={0.4}
				roughnessMap={floor}
				normalMap={normal}
				normalScale={[2, 2]}
			/>
		</mesh>
	)
}

const plane = new THREE.PlaneGeometry(10, 6, 1)

function Screen({ position }) {
	const mat = useRef()
	const [matReady, setMatReady] = useState(false)
	const [video] = useState(() =>
		Object.assign(document.createElement('video'), {
			src: './favorite-com.mp4',
			crossOrigin: 'Anonymous',
			loop: true,
			muted: true,
		})
	)
	useEffect(() => {
		//re-render
		setMatReady(true)
		video.play()
	}, [video, matReady])

	const [hovered, setHovered] = useState(false)
	useEffect(() => {
		document.body.style.cursor = hovered ? 'pointer' : 'auto'
	}, [hovered])
	return (
		<group
			position={position}
			onDoubleClick={(e) => {
				window.open(
					'https://www.youtube.com/playlist?list=PLpBplHYrcf1KxabCW1Y16gjwD23lmbzwT',
					'_blank'
				)
			}}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
		>
			<mesh geometry={plane} position={[0, 2.5, -4]}>
				<meshBasicMaterial ref={mat}>
					<videoTexture
						attach='map'
						args={[video]}
						colorSpace={THREE.SRGBColorSpace}
					/>
				</meshBasicMaterial>
			</mesh>
			{mat.current && (
				<>
					<mesh
						geometry={plane}
						material={mat.current}
						position={[8, 2.5, -1]}
						rotation-y={-Math.PI / 4}
					/>
					<mesh
						geometry={plane}
						material={mat.current}
						position={[-8, 2.5, -1]}
						rotation-y={Math.PI / 4}
					/>
				</>
			)}
		</group>
	)
}

useTexture.preload('./textures/SurfaceImperfections003_1K_var1.jpg')
useTexture.preload('./textures/SurfaceImperfections003_1K_Normal.jpg')
