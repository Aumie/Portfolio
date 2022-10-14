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
                  <h5>Thai-Nichi Institute of Technology</h5>
                </div>
                <div className='card-time text-muted'>
                  <small className='time'>2017 - 2021</small>
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
            <div>
              <p className='card-text pt-n3' style={{ color: 'black' }}>
                <FaAngleDoubleRight className='job-icon mt-1 me-2' style={{paddingBottom: '5px'}}/>
	  	Bachelor of Computer Engineering
              </p>
              <p className='card-text pt-n3' style={{ color: 'black' }}>
	        <FaAngleDoubleRight className='job-icon mt-1 me-2' style={{paddingBottom: '5px'}}/>
	  	GPAX: 3.47/4.00
	      </p>
            </div>
            <div className='card-btm d-flex justify-content-end'>
              <JackInTheBox direction='down'>
                <a href='https://www.tni.ac.th/home/' target='_blank' >
                  <button className='btn btn-info rgb ' style={{marginTop:'0px'}}>visit website</button>
                </a>
              </JackInTheBox>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
