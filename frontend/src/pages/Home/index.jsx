import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlogsContent } from '../../components/ui/BlogsContent'
import { Card } from '../../components/ui/Card'
import { Loading } from '../../components/ui/Loding'
import { ThreeColumns } from '../../layout'
import { axiosInstance } from '../../utils'

const projectUrl = '/blogs/post/?page_size=3&tags=project'
const postUrl = '/blogs/post/?page_size=3'
export const Home = () => {
	const [loading, setLoading] = useState(true)
	const [proj, setProj] = useState([])
	const [blogs, setBlogs] = useState([])

	const fetchBlogs = async () => {
		const resP = await axiosInstance.get(projectUrl)
		const resB = await axiosInstance.get(postUrl)
		setProj(resP.data.results)
		setBlogs(resB.data.results)
		setLoading(false)
	}
	useEffect(() => {
		fetchBlogs()
		document.title = 'Aum Peerapat'
	}, [])

	return (
		<React.Fragment>
			<div className='jumbotron'>
				<div className='container text-center'>
					<div className='p-5 mb-4 rounded-3'>
						<div className='py-5'>
							<h1 className='display-5 fw-bold'>Hi, I'm Peerapat (Aum)</h1>
							<p className='fs-4'>
								<span
								// className='tab'
								>
									I love everything about 3D.
									<br />
									3D is my lifelong journy.
								</span>
							</p>
							<button className='btn btn-warning rgb' type='button'>
								<a
									href='https://aumidev.me/static/media/uploads/AumProfile/cv_Peerapat_Channak.pdf'
									target='_blank'
									style={{ color: 'white' }}
								>
									CV Download
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
			{loading ? (
				<Loading loading={loading} />
			) : (
				<ThreeColumns>
					<section className='card-section'>
						<p>recent projects</p>
						{proj.map((obj, index) => {
							return <Card parent='home' obj={obj} key={index} />
						})}

						<div className='d-flex justify-content-end'>
							<p>
								<Link
									to={'/blog/?tags=project'}
									className='rgb'
									style={{ color: 'var(--clr-font)' }}
								>
									view more
								</Link>
							</p>
						</div>
					</section>
					<section className='blog-section'>
						<article className='full-column'>
							<div className='article-wrapper'>
								<div className='blog-label'>
									<div className='home-label rgb'>
										<Link to={'/blog'}>
											<h4 className='home-label-title'>BLOG</h4>
										</Link>
									</div>
								</div>
								{blogs.map((obj, index) => {
									return <BlogsContent obj={obj} key={index} />
								})}
							</div>
						</article>
					</section>
				</ThreeColumns>
			)}
		</React.Fragment>
	)
}
