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
							&emsp;I am a software developer who is still exploring and discovering where my true interests lie within the vast field of technology. Currently, I am interested in both front-end and back-end development and am excited about understanding how different components of a project integrate to create a seamless system. My goal is to gain experience and insights from working on diverse projects and learning from industry experts. With a passion for problem-solving and a commitment to growth, I am eager to contribute to a dynamic team while finding the area of expertise that best aligns with my skills and interests.
						</p>
                        <br/>
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
