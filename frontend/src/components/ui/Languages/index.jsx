import React from 'react'
import './index.css'
import { Fade, Slide } from 'react-awesome-reveal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export const Languages = () => {
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
                    <a href=''>
                      <h3 className='lang-underline lang'>English</h3>
                    </a>
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
                    <a href=''>
                      <h3 className='lang-underline lang'>Japanese</h3>
                    </a>
                  </OverlayTrigger>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
