import React from 'react'

export const Loading = ({ children, loading }) => {
  return (
    <section className='section loading'>
      <img
        src='/load/load.gif'
        alt=''
        className='rounded mx-auto d-block img-fluid'
      />
    </section>
  )
}
