import React from 'react'
import { Link } from 'react-router-dom'
import { ThreeColumns } from '../../layout'
import './index.scss'
export const Notfound = () => {
  return (
    <ThreeColumns>
      <div className='text-center'>
        <section className='error-container'>
          <span>4</span>
          <span>
            <span className='screen-reader-text'>0</span>
          </span>
          <span>4</span>
        </section>
        <h1 className='rgb'>Page Not Found</h1>
        <Link to='/' className='btn btn-primary rgb'>
          Back Home
        </Link>
      </div>
    </ThreeColumns>
  )
}
