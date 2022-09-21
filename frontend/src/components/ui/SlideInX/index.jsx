import React, { useRef } from 'react'
import './index.css'
import { useEffect } from 'react'
import { ThreeColumns } from '../../../layout/ThreeColumns'
import { Fade } from 'react-awesome-reveal'
import { skills } from './data'
import { v4 as uuid } from 'uuid'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useState } from 'react'

export const SkillSlideIn = () => {
  return (
    <React.Fragment>
      <div className='skills pt-5'>
        <div className='row g-0'>
          <div className='col-12'>
            <div className='d-flex'>
              <div className='p-2 mx-auto'>
                <Fade direction='down'>
                  <h3>Skiils</h3>
                  <div className='underline'></div>
                </Fade>
              </div>
            </div>
          </div>
          {skills.map((skill, index) => {
            if (index == skills.length - 1) {
              return (
                <div key={uuid()} className='col-12'>
                  <div className='d-flex'>
                    <div className='p-2 mx-auto'>
                      <Fade direction='up'>
                        <h3>{skill.title}</h3>
                        <div className='underline'></div>
                      </Fade>
                    </div>
                  </div>
                  <Fade direction='up' delay={500}>
                    <div className='d-flex mb-3 justify-content-center'>
                      {skill.logos.map((logo, index) => {
                        return (
                          <div key={uuid()} className='p-2 skill-logo'>
                            <OverlayTrigger
                              placement='bottom'
                              overlay={
                                <Tooltip>
                                  <div className='rgb'>
                                    <strong
                                      style={{ color: 'var(--clr-pallete-6)' }}
                                    >
                                      {/* style only works here */}
                                      {skill.tooltips[index]}
                                    </strong>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <img
                                className='skill-logo'
                                src={logo}
                                alt={skill.tooltips[index]}
                              />
                            </OverlayTrigger>
                          </div>
                        )
                      })}
                    </div>
                  </Fade>
                </div>
              )
            }
            if (index % 2 == 0)
              return (
                <div key={uuid()} className='col-lg-6'>
                  <div className='d-flex justify-content-center'>
                    <div className='p-2 me-lg-auto'>
                      <Fade direction='left'>
                        <h3>{skill.title}</h3>
                        <div className='underline'></div>
                      </Fade>
                    </div>
                  </div>
                  <div className='d-flex mb-3 justify-content-center'>
                    {skill.logos.map((logo, index) => {
                      return (
                        <div
                          key={uuid()}
                          className={`p-2 ${
                            index == skill.logos.length - 1 && 'me-lg-auto'
                          }`}
                        >
                          <Fade direction='left' delay={index * 200}>
                            <OverlayTrigger
                              placement='bottom'
                              overlay={
                                <Tooltip>
                                  <div className='rgb'>
                                    <strong
                                      style={{ color: 'var(--clr-pallete-6)' }}
                                    >
                                      {/* style only works here */}
                                      {skill.tooltips[index]}
                                    </strong>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <img
                                className='skill-logo'
                                src={logo}
                                alt={skill.tooltips[index]}
                              />
                            </OverlayTrigger>
                          </Fade>
                        </div>
                      )
                    })}
                    {/* <div className='p-2 me-lg-auto'>Flex item</div> */}
                  </div>
                </div>
              )
            else {
              return (
                <div key={uuid()} className='col-lg-6'>
                  <div className='d-flex justify-content-center'>
                    <div className='p-2 ms-lg-auto'>
                      <Fade direction='right'>
                        <h3>{skill.title}</h3>
                        <div className='underline'></div>
                      </Fade>
                    </div>
                  </div>
                  <div className='d-flex mb-3 flex-row-reverse justify-content-center'>
                    {skill.logos.map((logo, index) => {
                      return (
                        <div
                          key={uuid()}
                          className={`p-2 ${
                            index == skill.logos.length - 1 && 'ms-lg-auto'
                          }`}
                        >
                          <Fade direction='right' delay={index * 200}>
                            <OverlayTrigger
                              placement='bottom'
                              overlay={
                                <Tooltip>
                                  <div className='rgb'>
                                    <strong
                                      style={{ color: 'var(--clr-pallete-6)' }}
                                    >
                                      {/* style only works here */}
                                      {skill.tooltips[index]}
                                    </strong>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <img
                                className='skill-logo'
                                src={logo}
                                alt={skill.tooltips[index]}
                              />
                            </OverlayTrigger>
                          </Fade>
                        </div>
                      )
                    })}
                    {/* <div className='p-2 ms-lg-auto'>Flex item3</div> */}
                  </div>
                </div>
              )
            }
          })}

          {/* bottom */}
        </div>
      </div>
    </React.Fragment>
  )
}
