import React from 'react'
export const Categories = ({ tags, clickTags, query }) => {
  const allTags = ['All', ...tags.map((tag) => tag.name)]
  return (
    <div className='btn-container'>
      <div className='d-flex align-content-start flex-wrap ms-4'>
        {allTags.map((tag, index) => {
          return (
            <button
              type='button'
              className={`filter-btn rgb ${
                query.split(',').includes(tag) ? 'filter-btn-active' : null
              }`}
              key={index}
              onClick={(e) => {
                e.preventDefault()
                clickTags(tag)
              }}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}
