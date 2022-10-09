import React, { useState } from 'react'
// import { useGlobalContext, AppContext } from '../../../context'
import { Modal } from '../Modal'
import moment from 'moment'
import { Link } from 'react-router-dom'
export const Card = ({ parent, obj }) => {
  // const { openModal } = useGlobalContext(AppContext)
  const [showModal, setShowModal] = useState(false)

  return (
    <React.Fragment>
      <div
        className='card mb-3 card-body-shadow mt-2 card-section'
        style={{ background: 'var(--card-bg)' }}
      >
        <div className='row g-0'>
          <div
            className='col-md-4 row row-cols-1'
            style={{ marginLeft: '.1em' }}
          >
            <div className='d-flex align-items-center'>
              <div className='col'></div>
              <div
                className='col flex-fill'
                style={{ paddingTop: '5px', paddingBottom: '5px' }}
              >
                <img
                  src={parent == 'home' ? obj.cover_image : obj.image}
                  className='img-fluid rounded-start '
                  style={
                    parent == 'home'
                      ? { width: '100%', height: '120px', objectFit: 'cover' }
                      : { width: '100px', height: '100px' }
                  }
                  alt='...'
                />
              </div>
              <div className='col'></div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title card-head'>
                {/* {parent == 'home' ? obj.title : info.title} */}
                &ensp;{obj.title}
              </h5>
              <p className='card-text' style={{ color: 'black' }}>
                {/* {parent == 'home' ? obj.desc : info.desc} */}
                {obj.desc}
              </p>
              <div className='d-flex'>
                <p className='card-text flex-grow-1'>
                  <small className='text-muted'>
                    {parent == 'home'
                      ? moment(obj.updated_at).local().fromNow()
                      : ''}
                  </small>
                </p>
                <p>
                  <Link
                    to={parent == 'home' ? `/blog/post/${obj.slug}` : '#'}
                    style={{ color: 'var(--clr-pallete-5)' }}
                    onClick={
                      parent == 'cert'
                        ? (e) => {
                            e.preventDefault()
                            setShowModal(true)
                          }
                        : () => {}
                    }
                  >
                    view
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {console.log(obj.file)} */}
      {showModal ? (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <iframe height='100%' width='100%' src={obj.file} />
        </Modal>
      ) : null}
    </React.Fragment>
  )
}
