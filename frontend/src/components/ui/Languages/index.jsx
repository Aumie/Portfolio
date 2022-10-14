import React from 'react'
import './index.css'
import { Fade, Slide } from 'react-awesome-reveal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useState } from 'react'

export const Languages = ({ files }) => {
  const [showJModal, setShowJModal] = useState(false)
  const [showEModal, setShowEModal] = useState(false)
  const jap = files?.filter((f) => f?.name[0].toLowerCase == 'j')[0]
  const eng = files?.filter((f) => f?.name[0].toLowerCase == 'e')[0]

  return (
    <React.Fragment>
      <div className='p-2 mx-auto text-center mt-5'>
        <Slide direction='down'>
          <h2>Languages</h2>
          <div className='underline'></div>
        </Slide>
      </div>
      <div className=''>
        <div className='row g-0 text-center'>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-center'>
              <div className='p-2'>
                <Fade direction='left'>
                  <OverlayTrigger
                    placement='left'
                    overlay={
                      <Tooltip>
                        <div className='rgb'>
                          <strong style={{ color: 'var(--clr-pallete-6)' }}>
                            clickMe
                          </strong>
                        </div>
                      </Tooltip>
                    }
                  >
                    <h3
                      className='lang-underline lang'
                      onClick={(e) => {
                        e.preventDefault()
                        setshowEModal(true)
                      }}
                    >
                      English
                    </h3>
                  </OverlayTrigger>
                </Fade>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-center'>
              <div className='p-2'>
                <Fade direction='right'>
                  <OverlayTrigger
                    placement='right'
                    overlay={
                      <Tooltip>
                        <div className='rgb'>
                          <strong style={{ color: 'var(--clr-pallete-6)' }}>
                            clickMe
                          </strong>
                        </div>
                      </Tooltip>
                    }
                  >
                    <h3
                      className='lang-underline lang'
                      onClick={(e) => {
                        e.preventDefault()
                        setshowJModal(true)
                      }}
                    >
                      Japanese
                    </h3>
                  </OverlayTrigger>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEModal ? (
        <Modal showModal={showEModal} setShowModal={setShowEModal}>
          <iframe height='100%' width='100%' src={eng} />
        </Modal>
      ) : null}
      {showJModal ? (
        <Modal showModal={showJModal} setShowModal={setShowJModal}>
          <iframe height='100%' width='100%' src={jap} />
        </Modal>
      ) : null}
    </React.Fragment>
  )
}
