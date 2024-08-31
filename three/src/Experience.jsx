import * as THREE from 'three'
import { useEffect } from 'react'
import { extend, useThree } from '@react-three/fiber'
import {
	Text3D,
	Text,
	Sky,
	CameraControls,
	useMatcapTexture,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRoute } from 'wouter'
import { geometry } from 'maath'
import Frames from './Components/Frames'

import Water from './Components/Water'
import CloudsAndFog from './Components/Clouds'

extend(geometry)

export default function Experience() {
	const [matcapTexture] = useMatcapTexture('9D7F6E_C6DAD4_6D4C4B_C6BBBC')

	return (
		<>
			<color attach='background' args={['#efefff']} />
			<EffectComposer
			// multisampling={2}
			>
				<Bloom mipmapBlur intensity={0.05} luminanceThreshold={0} />
			</EffectComposer>
			<Text3D
				position={[-2.8, 1.2, 0]}
				scale={[1, 1, 1]}
				size={0.2}
				maxWidth={[1, 1, 1]}
				font={'/gt.json'}
				curveSegments={24}
				brevelSegments={1}
				bevelEnabled
				bevelSize={0.01}
				bevelThickness={0.03}
				height={0.01}
				lineHeight={1}
				letterSpacing={0}
			>
				{`Software Developer`}
				<meshMatcapMaterial color='white' matcap={matcapTexture} />
			</Text3D>
			<Text color={'black'} fontSize={0.1} position-y={-1}>
				Double click to enter
			</Text>
			<Frames />
			{/* <OrbitControls /> */}
			<Rig />
			<Sky
				distance={450000}
				sunPosition={[0, 100, -100]}
				inclination={0.2}
				azimuth={0.1}
			/>
			<CloudsAndFog />
			{/* <MyModel /> */}
			<Water />
		</>
	)
}

const camConfig = {
	minAzimuthAngle: -Math.PI / 2 + Math.PI / 4,
	maxAzimuthAngle: Math.PI / 2 - Math.PI / 4,
}

function Rig({
	position = new THREE.Vector3(0, 0, 2.3),
	focus = new THREE.Vector3(0, 0, 0),
}) {
	const { controls, scene, camera } = useThree()
	const [, params] = useRoute('/:link')
	useEffect(() => {
		const active = scene.getObjectByName(params?.link + '.cameraTarget')
		if (active) {
			active.localToWorld(position.set(0, 0.1, 0.25))
			active.localToWorld(focus.set(0, 0, -2))
			// console.log(active.parent)
		}
		controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
	})
	return (
		<CameraControls
			makeDefault
			minPolarAngle={window.location.pathname == '/' ? 1.309 : 1.0472}
			maxPolarAngle={2.00713}
			{...camConfig}
			minDistance={1.7}
			maxDistance={2.5}
			infinityDolly={false}
			truckSpeed={0}
		/>
	)
}
