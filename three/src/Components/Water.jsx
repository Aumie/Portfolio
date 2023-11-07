import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import waterVertexShader from '../Shaders/Water/vertex.glsl'
import waterFragmentShader from '../Shaders/Water/fragment.glsl'
import { Reflector } from 'three/addons/objects/Reflector.js'
import { useEffect, useRef } from 'react'
import { useTexture } from '@react-three/drei'

extend({ Reflector })
const circleGeometry = new THREE.CircleGeometry(36, 64)
const customShader = Reflector.ReflectorShader

export default function Water() {
	const dudvMap = useTexture('./textures/waterdudv.jpg')

	dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping

	customShader.vertexShader = waterVertexShader
	customShader.fragmentShader = waterFragmentShader
	customShader.uniforms.tDudv = { value: dudvMap }
	customShader.uniforms.time = { value: 0 }

	const waterObject = {
		shader: customShader,
		clipBias: 0.003,
		textureWidth: 1024,
		textureHeight: 1024,
		// color: 0x000000,
	}

	const waterMaterial = useRef()
	useFrame((state, delta) => {
		waterMaterial.current.material.uniforms.time.value += 1 * delta
	})
	useEffect(() => {
		// console.log(waterMaterial.current.material)
		waterMaterial.current.material.depthWrite = false
		// waterMaterial.current.material.depthTest = false
	}, [])
	return (
		<reflector
			ref={waterMaterial}
			args={[circleGeometry, waterObject]}
			position={[0, -1.1, -1.5]}
			rotation-x={-Math.PI / 2}
		/>
	)
}
