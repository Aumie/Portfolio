import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { links } from './data'
import { useContext } from 'react'
import { AuthContext } from '../../../context'
const logol = '/logos/logol.svg'
const logod = '/logos/logod.svg'
const getStorageTheme = () => {
	let theme = 'light-theme'
	let sw = 'on'
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme')
		sw = localStorage.getItem('swTheme')
	}
	return [theme, sw]
}
export const Navbar = () => {
	const location = useLocation()
	const [path, setPath] = useState('/')
	const [showLinks, setShowLinks] = useState(false)
	const linksContainerRef = useRef(null)
	const linksRef = useRef(null)
	const [theme, setTheme] = useState(getStorageTheme()[0])
	const [swTheme, setSwTheme] = useState(getStorageTheme()[1]) //it errors if use just boolean, dk y???
	const { currentUser, logout, setCurrentUser } = useContext(AuthContext)

	const toggleTheme = (e) => {
		if (theme === 'light-theme' && swTheme === 'on') {
			setTheme('dark-theme')
			setSwTheme('off')
		} else {
			setTheme('light-theme')
			setSwTheme('on')
		}
	}
	useEffect(() => {
		document.documentElement.className = theme
		document.getElementById('toggle-1').checked = swTheme == 'on' ? true : false
		localStorage.setItem('theme', theme)
		localStorage.setItem('swTheme', swTheme)
	}, [theme, swTheme])
	useEffect(() => {
		const linksHeight = linksRef.current.getBoundingClientRect().height
		// console.log(linksContainerRef.current.getBoundingClientRect().height)
		// console.log(linksHeight)
		if (showLinks) {
			linksContainerRef.current.style.height = `${linksHeight + 3}px`
		} else {
			linksContainerRef.current.style.height = '0px'
		}
		return () => {}
	}, [showLinks])
	useEffect(() => {
		// setPath(window.location.pathname)
		// console.log(path)
		// console.log(location.pathname)
	}, [location.pathname, currentUser])
	return (
		<nav className='navbar navbar-expand-lg rgb'>
			<div className='container'>
				{/* brand */}
				<a href='https://aumidev.me/portfolio' className='ps-0'>
					<img
						src={swTheme == 'on' ? logol : logod}
						alt='logo'
						className='brand'
					/>
				</a>
				{/* 2items */}
				<h4 className='me-2 ms-auto mt-2'>
					{/* <a href='#' className='links'>
            <span>A</span>
            <span>あ</span>
          </a> */}
				</h4>
				<span className='me-2 mt-1'>
					<input
						type='checkbox'
						name='toggleTheme'
						className='sw'
						id='toggle-1'
						onChange={toggleTheme}
						checked={swTheme == 'on' ? true : false}
					/>
					<label htmlFor='toggle-1'></label>
					<input
						type='checkbox'
						name='toggleTheme'
						className='sw'
						id='toggle-2'
					/>
				</span>
				<button
					className=' nav-toggle'
					type='button'
					onClick={() => setShowLinks(!showLinks)}
				>
					<FaBars />
				</button>

				<div
					// className={`${
					//   showLinks ? 'links-container show-container' : 'links-container'
					// }`}
					className='navbar-collapse flex-grow-0 links-container'
					ref={linksContainerRef}
				>
					<ul className='navbar-nav links' ref={linksRef}>
						{links.map((link) => {
							const { id, url, text } = link
							return (
								<li
									key={id}
									className={`nav-item nav-btn ${
										location.pathname.match(url) && 'nav-btn-active'
									}`}
								>
									{url[0] == '/' ? (
										<Link to={url}>{text}</Link>
									) : (
										<a href={url}>{text}</a>
									)}
								</li>
							)
						})}
					</ul>
				</div>
				{/* <ul className='social-icons'>
        {social.map((socialIcon) => {
          const { id, url, icon } = socialIcon
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          )
        })}
      </ul> */}
				<div>
					<span style={{ marginRight: '6px' }}>{currentUser?.name}</span>
				</div>
				<div>
					<span style={{ cursor: 'pointer' }} onClick={logout}>
						{currentUser ? 'Logout' : ''}
					</span>
				</div>
			</div>
		</nav>
	)
}
