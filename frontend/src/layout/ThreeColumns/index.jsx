import React from 'react'

export const ThreeColumns = ({ children }) => {
  return (
    <div className='container pt-4'>
      <div className='row justify-content-center'>
        <div className='col-lg-2 col-xs-2 d-none d-lg-block'></div>
        <div className='col-lg-8 col-sm-8 col-xs-8'>{children}</div>
        <div className='col-lg-2 col-xs-2 d-none d-lg-block'></div>
      </div>
    </div>
  )
}
