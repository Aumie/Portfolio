import Frame from './Frame'
import MyModel from '../Model/MyModel'

export default function Me() {
	return (
		<Frame
			link='me'
			name='Me'
			bg='#cecece'
			camTargetPos={[0.5, -0.1, 1.2]}
			camTargetRot={[0, 0, 0]}
		>
			<fog attach='fog' args={['#cecece', 0, 12]} />

			<directionalLight
				intensity={4.5}
				position={[2, 3.5, 5]}
				shadow-mapSize={1024}
				castShadow
			>
				<orthographicCamera
					attach='shadow-camera'
					args={[-5, 5, -5, 5, 0, 15]}
				/>
			</directionalLight>
			<ambientLight intensity={0.5} />

			<MyModel />
			{/* error?? gues that it's from SoftShawdow in another portal, but shadow still work with out this */}
			{/* <SoftShadows size={25} focus={0} samples={10} />     */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
				<circleGeometry args={[10, 32]} scale={0.5} />
				<shadowMaterial transparent opacity={0.5} />
			</mesh>
		</Frame>
	)
}
