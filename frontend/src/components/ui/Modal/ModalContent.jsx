import React from 'react'

export const ModalContent = ({ children, isOpen }) => {
  return (
    <div className='modal-overlay' onClick={() => isOpen(false)}>
      <div className='modal-container'>{children}</div>
    </div>
  )
}
