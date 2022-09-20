import React, { useState, useEffect } from 'react'
import { FaAngleUp } from 'react-icons/fa'
import ToTop from '../../../assets/totop.gif'

import './index.css'

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className='top-to-btm'>
      {showTopBtn && (
        <img
          src={ToTop}
          className='icon-position icon-style rgb'
          onClick={goToTop}
        />
      )}
    </div>
  )
}
export default ScrollToTop
