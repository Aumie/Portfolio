import React from 'react'

export const BlogsContent = ({ title, date, content }) => {
  return (
    <div className='blog-list-home'>
      <div className='blog-list-content blog-content-underline rgb'>
        <h4>Blog Title Sample</h4>
        <span className='fw-lighter'>
          <span className='year rgb'>&ensp;2018&ensp;</span>
          &ensp;November, 12
        </span>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          nam, vero facilis sint dolorem numquam veniam consequuntur repudiandae
          pariatur ipsa.
        </p>
      </div>
    </div>
  )
}
