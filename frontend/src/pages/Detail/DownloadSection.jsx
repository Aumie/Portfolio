import React from 'react'
import { FaWindows, FaApple } from 'react-icons/fa'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
export default function DownloadSection({ files }) {
  return (
    <>
      <hr className='rgb' />
      <div>
        <h5>
          <u>Download</u>:
        </h5>
      </div>
      <div className='download rgb'>
        {files &&
          files.map((f) => {
            if (f.os == 'W') {
              return (
                <div>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip>
                        <div className='rgb'>
                          <strong style={{ color: 'var(--clr-pallete-6)' }}>
                            {/* style only works here */}
                            {f.name}
                          </strong>
                        </div>
                      </Tooltip>
                    }
                  >
                    <button>
                      <FaWindows style={{ paddingBottom: '2px' }} />
                      <span>
                        <a href={f.file}>Windows</a>
                      </span>
                    </button>
                  </OverlayTrigger>
                </div>
              )
            } else {
              return (
                <div>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip>
                        <div className='rgb'>
                          <strong style={{ color: 'var(--clr-pallete-6)' }}>
                            {/* style only works here */}
                            {f.name}
                          </strong>
                        </div>
                      </Tooltip>
                    }
                  >
                    <button>
                      <FaApple
                        style={{ paddingBottom: '4px', fontSize: '1.3em' }}
                      />
                      <span>
                        <a href={f.file}>Mac</a>
                      </span>
                    </button>
                  </OverlayTrigger>
                </div>
              )
            }
          })}
      </div>
    </>
  )
}
