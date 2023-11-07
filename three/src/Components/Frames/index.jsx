import * as THREE from 'three'
import { easing } from 'maath'
import { useRoute, useLocation } from 'wouter'
import { useEffect, useRef, useState, Suspense } from 'react'
import {
	useCursor,
	MeshPortalMaterial,
	Text,
	Gltf,
	Float,
} from '@react-three/drei'
import FavoriteWork from './FavoriteWork'
import PreferredTools from './PreferredTools'
import Me from './Me'
export default function Frames() {
	return (
		<>
			<FavoriteWork />
			<Me />
			<PreferredTools />
		</>
	)
}
