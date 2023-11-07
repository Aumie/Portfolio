import * as THREE from 'three'

import { Clouds, Cloud } from '@react-three/drei'
import { useControls } from 'leva'
export default function CloudsAndFog() {
	return (
		<>
			<Clouds material={THREE.MeshBasicMaterial}>
				<Cloud
					speed={-0.2}
					fade={2}
					segments={30}
					bounds={[3, 1, 3]}
					volume={0.7}
					position={[3, 0.4, -2]}
					opacity={0.22}
					concentrate='inside'
					color='#f1f1f1'
					seed={9}
				/>
				<Cloud
					speed={-0.2}
					fade={2}
					segments={35}
					bounds={[10, 7, 20]}
					volume={12}
					position={[-22, 6, -3.2]}
					opacity={0.75}
					concentrate='outside'
					color='#efefff'
					seed={9}
					rotation-x={-Math.PI / 2}
				/>
				<Cloud
					speed={-0.2}
					fade={2}
					segments={35}
					bounds={[10, 7, 20]}
					volume={12}
					position={[22, 6, -3.2]}
					rotation-y={Math.PI}
					opacity={0.75}
					concentrate='outside'
					color='#efefff'
					seed={3}
					rotation-x={-Math.PI / 2}
				/>
			</Clouds>
		</>
	)
}
