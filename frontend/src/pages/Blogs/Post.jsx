import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const Post = ({ post }) => {
  const { id, title, slug, desc, tags, updated_at, author, published } = post
  return (
    <React.Fragment key={id}>
      <div className='item-info'>
        <header>
          <Link
            to={published ? `post/${slug}` : `post/${slug}/edit`}
            className='title-link'
          >
            <h4>{title}</h4>
          </Link>
          <span className='year2'>
            Last update: {moment(updated_at).utc().local().fromNow()}
          </span>
        </header>
        <p className='item-text'>{desc}</p>
      </div>
      <div className='tags'>
        {tags.map((tag, index) => {
          return (
            <label className='tag rgb' key={index}>
              {tag.name}
            </label>
          )
        })}
      </div>
      <div
        className='blog-content-underline'
        style={{ paddingTop: '25px' }}
      ></div>
    </React.Fragment>
  )
}
