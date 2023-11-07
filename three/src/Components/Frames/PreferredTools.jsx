import { Gltf, Html, SoftShadows, useGLTF, useTexture } from '@react-three/drei'
import Frame from './Frame'
import { RigidBody, Physics, CuboidCollider } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { icons } from './data'
import './style.css'

export default function PreferredTools() {
	return (
		<Frame
			link='preferredtools'
			name={`Preferred\ntools`}
			bg='#d1d1ca'
			position={[1.15, 0, 0]}
			// rotation={[0, -0.5, 0]}
			rotation={[0, 0, 0]}
			headerSize={0.15}
			camTargetPos={[1.4, 2.2, 0]}
			camTargetRot={[-Math.PI / 3.7, 0, 0]}
		>
			<SoftShadows size={25} focus={0} samples={10} />
			<fog attach='fog' args={['#d1d1ca', 0, 12]} />
			<ambientLight intensity={0.5} />
			<directionalLight
				castShadow
				position={[3.5, 9.3, 5]}
				intensity={1.5}
				shadow-mapSize={1024}
			>
				<orthographicCamera
					attach='shadow-camera'
					args={[-10, 10, -10, 10, 0.2, 16]}
				/>
			</directionalLight>
			<pointLight position={[-10, 0, -20]} color='white' intensity={1} />
			<pointLight position={[0, -10, 0]} intensity={1} />
			<Playground />
			{/* <axesHelper args={[20]} /> */}
		</Frame>
	)
}

const sphere = new THREE.IcosahedronGeometry(1, 32, 32)
const mat = new THREE.MeshPhysicalMaterial({
	transmission: 1,
	roughness: 0.2,
	thickness: 0.4,
	ior: 1.5,
})

function Playground() {
	const balls = useRef([])
	const ballMeshes = useRef([])
	const [quackSound] = useState(() => new Audio('./quack.mp3'))
	const glassNormal = useTexture('./textures/Glass_Frosted_001_normal.jpg')
	const glassHeight = useTexture('./textures/Glass_Frosted_001_height.png')

	const iconTextures = []
	icons.map(({ texture }) => {
		iconTextures.push(useTexture(texture))
	})

	mat.normalMap = glassNormal
	mat.displacementMap = glassHeight
	mat.displacementScale = 0.08

	const text = useRef()
	const pointer = (idx, enter) => {
		text.current.innerHTML = enter ? icons[idx].name : ''
		text.current.className = enter ? 'show' : 'hide'
	}

	const quack = () => {
		quackSound.currentTime = 0
		quackSound.volume = 1
		quackSound.play()
	}
	return (
		<Physics gravity={[0, -9.08, 0]}>
			<group position={[0.6, -0.5, -3.5]} rotation-y={Math.PI}>
				<mesh
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, -0.23, 0]}
					receiveShadow
				>
					<circleGeometry args={[32, 32]} />
					<shadowMaterial transparent opacity={0.5} />
				</mesh>
				<RigidBody type='fixed'>
					<Gltf
						src='Duck.glb'
						scale={1}
						position={[0, -0.3, -1.3]}
						rotation-y={2}
						castShadow
						onClick={() => quack()}
					/>

					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
						<circleGeometry args={[18, 18]} />
						<meshStandardMaterial color='#ff0f0f' />
					</mesh>
					<CuboidCollider args={[7, 7, 0.5]} position={[0, 3.5, 5]} />
					<CuboidCollider args={[7, 7, 0.5]} position={[0, 3.5, -3.5]} />
					<CuboidCollider args={[0.5, 7, 7]} position={[7, 3.5, 0]} />
					<CuboidCollider args={[0.5, 7, 7]} position={[-7, 3.5, 0]} />
				</RigidBody>
				{iconTextures.map((v, i) => {
					const pos = () => Math.random() - 0.5
					const x = pos() - 0.2
					const y = Math.min(0.3, Math.random())
					const z = pos() - 0.45
					return (
						<RigidBody
							colliders='ball'
							key={i}
							ref={(element) => {
								balls.current[i] = element
							}}
							canSleep={false}
						>
							<mesh
								name={i}
								ref={(element) => {
									ballMeshes.current[i] = element
								}}
								castShadow
								receiveShadow
								geometry={sphere}
								material={mat}
								scale={0.5}
								position={[x, y, z]}
								onClick={(e) => {
									e.stopPropagation()
									balls.current[parseInt(e.object.name)].applyImpulse({
										x: 0,
										y: 2,
										z: Math.random() - 0.5,
									})
								}}
								onPointerEnter={() => pointer(i, true)}
								onPointerLeave={() => pointer(i, false)}
							/>
							<mesh position={[x, y, z]} scale={0.45}>
								<circleGeometry />
								<meshBasicMaterial
									side={THREE.DoubleSide}
									alphaMap={v}
									map={v}
									// transparent={true}
								/>
							</mesh>
						</RigidBody>
					)
				})}
				<group position={[-1.3, 1.6, -1.6]}>
					<Html geometry={<roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />}>
						<div ref={text} className='hide'>
							hoh
						</div>
					</Html>
				</group>
			</group>
		</Physics>
	)
}

useGLTF.preload('./Duck.glb')
useTexture.preload('./textures/Glass_Frosted_001_normal.jpg')
useTexture.preload('./textures/Glass_Frosted_001_height.png')
icons.map(({ texture }) => useTexture.preload(texture))
