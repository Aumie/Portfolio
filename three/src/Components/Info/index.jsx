import { motion } from 'framer-motion'
import './info.scss'
import { useRoute } from 'wouter'

const variants = {
	show: {
		clipPath: 'inset(0% 0% 0% 0%)',
		transition: {
			delay: 1.5,
			type: 'spring',
			bounce: 0,
			duration: 0.7,
			// delayChildren: 0.3,
			// staggerChildren: 0.05,
		},
	},
	hide: {
		clipPath: 'inset(0% 0% 0% 100%)',
		transition: {
			type: 'spring',
			bounce: 0,
			duration: 0.3,
		},
	},
}

export default function Info() {
	const [, params] = useRoute('/:link')
	return (
		<motion.div
			className='info'
			animate={params?.link == 'me' ? 'show' : 'hide'}
		>
			<motion.div className='bg' variants={variants} initial={false}>
				<div className='infoBox'>
					<div className='name'>
						<h1>Peerapat Channak</h1>
					</div>
					<div className='nickName'>
						<span>Aum</span>
					</div>
					<div className='about'>
						<p>
							&emsp;I am passionate about anything 3D. My journy began from
							exploring Unreal Engine. While doing that, shaders piqued my
							interest and it led me to the world of OpenGL. But OpenGL itself
							is quite a steep curve to learn, so I chose to start from Three.js
							and R3F.
						</p>
						<span>
							Studio which inspire me the most on web development&rarr;
							<a href='https://unseen.co' target='_'>
								Unseen
							</a>
						</span>
						<p>
							<a href='https://aumidev.me/static/media/uploads/AumProfile/cv_Peerapat_Channak.pdf'>
								&rarr;Resume
							</a>
						</p>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}
