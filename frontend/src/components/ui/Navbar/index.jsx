import React, { useState, useRef, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { links } from './data'
import logol from '../../../assets/logol.svg'
import logod from '../../../assets/logod.svg'
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
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)
  const [theme, setTheme] = useState(getStorageTheme()[0])
  const [swTheme, setSwTheme] = useState(getStorageTheme()[1]) //it errors if use just boolean, dk y???
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
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px'
    }
    return () => {}
  }, [showLinks])
  useEffect(() => {
    const pathname = window.location.pathname
    console.log(pathname)
  }, [])
  return (
    <nav className='navbar navbar-expand-lg rgb'>
      <div className='container'>
        {/* brand */}
        <a href='#' className='ps-0'>
          <img
            src={swTheme == 'on' ? logol : logod}
            alt='logo'
            className='brand'
          />
        </a>
        {/* 2items */}
        <h4 className='me-2 ms-auto mt-2'>
          <a href='#' className='links'>
            <span>a</span>
            <span>あ</span>
          </a>
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
                <li key={id} className='nav-item'>
                  <a href={url} className='nav-btn'>
                    {text}
                  </a>
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
      </div>
    </nav>
  )
}
