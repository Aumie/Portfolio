import React from 'react'
import { Link } from 'react-router-dom'
export const Notfound = () => {
  return (
    <div>
      <h1>Error Page</h1>
      <Link to='/' className='btn'>
        Back Home
      </Link>
    </div>
  )
}
