import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { JackInTheBox, Fade, Slide, Zoom } from 'react-awesome-reveal'
export const EducationCard = () => {
  return (
    <React.Fragment>
      <div className='p-2 mx-auto  mt-5 text-center'>
        <Zoom direction='down'>
          <h2>Education</h2>
          <div className='underline'></div>
        </Zoom>
      </div>
      <div className='col-12'>
        <div className='card card-body-shadow'>
          <Slide direction='down'>
            <div className='card-header card-head'>
              <div className='d-flex'>
                <div className='card-title flex-grow-1'>
                  <h5>Card title</h5>
                </div>
                <div className='card-time text-muted'>
                  <small className='time'>time</small>
                </div>
              </div>
            </div>
          </Slide>
          <div className='card-body'>
            <div className='d-flex justify-content-center mb-3'>
              <img
                src='./logos/tni.png'
                alt='TNI'
                className='tni-logo'
                style={{ height: '6em' }}
              />
            </div>
            <div className='d-flex'>
              <FaAngleDoubleRight className='job-icon mt-1 me-2' />
              <p className='card-text pt-n3' style={{ color: 'black' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, qui ab! Sequi maiores quam, ducimus maxime facilis
                sapiente atque, dignissimos quisquam quas ipsa quasi illo
                veritatis quod illum amet sunt.
              </p>
            </div>
            <div className='card-btm d-flex justify-content-end'>
              <div>
                <JackInTheBox direction='down'>
                  <a href='https://www.tni.ac.th/home/'>
                    <button className='btn btn-info rgb '>visit website</button>
                  </a>
                </JackInTheBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
