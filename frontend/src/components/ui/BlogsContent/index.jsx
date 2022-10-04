import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
export const BlogsContent = ({ obj }) => {
  return (
    <div className='blog-list-home'>
      <div className='blog-list-content blog-content-underline'>
        <Link to={`/blogs/post/${obj.slug}`}>
          <h4 className='rgb'>{obj.title}</h4>
        </Link>
        <span className='fw-lighter d-flex'>
          <span className='year rgb'>
            &ensp;{moment(obj.created_at).utc().local().format('Y')}&ensp;
          </span>
          &ensp;{moment(obj.created_at).utc().local().format('MMMM, D')}
          <span className='ms-auto'>
            Last update:&ensp;{moment(obj.updated_at).utc().local().fromNow()}
          </span>
        </span>

        <p>{obj.desc}</p>
      </div>
    </div>
  )
}
