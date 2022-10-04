import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import './index.css'

// import { useGlobalContext } from '../../../context'
import PortalReactDOM from 'react-dom'

export const Modal = ({ children, showModal, setShowModal }) => {
  // const { isModalOpen, closeModal } = useGlobalContext()
  // const [isModalOpen, closeModal] = useState(false)
  return PortalReactDOM.createPortal(
    <React.Fragment>
      <div
        className={`${
          showModal ? 'modal-overlay show-modal' : 'modal-overlay'
        }`}
      >
        <div className='modal-container'>
          <button
            className='close-modal-btn rgb'
            onClick={() => setShowModal(false)}
          >
            <FaTimes />
          </button>
          {children}
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  )
}
