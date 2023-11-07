import { easing } from 'maath'
import { useRoute, useLocation } from 'wouter'
import { useEffect, useRef, useState } from 'react'
import { useCursor, MeshPortalMaterial, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import useSidebar from '../../Stores/useSidebar'

export default function Frame({
	name,
	link,
	bg,
	width = 1,
	height = 1.61803398875,
	headerSize = 0.2,
	children,
	camTargetPos = [0, 0, 0],
	camTargetRot = [0, 0, 0],
	...props
}) {
	const portal = useRef()
	const [, setLocation] = useLocation()
	const [, params] = useRoute('/:link')
	const [hovered, hover] = useState(false)
	const { controls, scene, camera } = useThree()

	const isSidebarOpen = useSidebar((state) => state.isOpen)

	useCursor(hovered)
	useFrame(
		(state, dt) => {
			easing.damp(
				portal.current,
				'blend',
				params?.link === link ? 1 : 0,
				0.1,
				dt
			)
			// console.log(controls)
		},
		[params]
	)

	//prevent clicking item
	useEffect(() => {
		const unsubSidebar = useSidebar.subscribe(
			(state) => state.isOpen,
			(value) => {
				if (value) {
					// console.log('call')
					hover(false)
				}
			}
		)
		return () => {
			// console.log('clear')
			unsubSidebar()
		}
	}, [])

	return (
		<group {...props}>
			<mesh
				name={`${link}.cameraTarget`}
				position={camTargetPos}
				rotation={camTargetRot}
				visible={false}
			>
				<boxGeometry />
				<meshBasicMaterial color='red' />
			</mesh>
			<Text
				fontSize={headerSize}
				font={'Inter-Bold.woff'}
				anchorY='top'
				anchorX='left'
				lineHeight={0.8}
				position={[-0.375, 0.715, 0.01]}
				material-toneMapped={false}
			>
				{name}
			</Text>
			<mesh
				name={link}
				onDoubleClick={(e) => {
					if (isSidebarOpen) return
					e.stopPropagation(), setLocation('/' + e.object.name)
				}}
				onPointerOver={(e) => hover(true)}
				onPointerOut={() => hover(false)}
			>
				<roundedPlaneGeometry args={[width, height, 0.1]} />
				<MeshPortalMaterial
					ref={portal}
					events={params?.link === link}
					// side={THREE.DoubleSide}
					toneMapped={false}
				>
					<color attach='background' args={[bg]} />
					{children}
				</MeshPortalMaterial>
			</mesh>
		</group>
	)
}
