import React from 'react'
import { social } from './data'
import { FaHeart } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer id='contact' className='mt-5'>
      {/* <hr /> */}
      <div className='container text-center rgb'>
        <div className='py-4 my-4 border-top-footer'>
          <ul className='list-unstyled d-flex justify-content-center social-icons'>
            {social.map(({ id, url, icon }) => (
              <li className='ms-3' key={id}>
                <a href={url}>{icon}</a>
              </li>
            ))}
          </ul>
          <p>
            Just A Common Personal Website <FaHeart />
          </p>
        </div>
      </div>
    </footer>
  )
}
