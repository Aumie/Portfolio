import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import './index.css'
import { Fade } from 'react-awesome-reveal'

const url = 'https://course-api.com/react-tabs-project'
export const Tabs = () => {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValues] = useState(0)

  const fetchJobs = async () => {
    const res = await fetch(url)
    const newJobs = await res.json()
    setJobs(newJobs)
    setLoading(false)
  }
  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    )
  }
  const { company, dates, duties, title } = jobs[value]
  return (
    <section className='section'>
      <Fade direction='up'>
        <div className='title'>
          <h2>experience</h2>
          <div className='underline'></div>
        </div>
        <div>
          <div className='d-flex justify-content-center'>
            {jobs.map((item, index) => {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setValues(index)
                  }}
                  className={`job-btn ${index === value && 'active-btn'}`}
                >
                  {item.company}
                </button>
              )
            })}
          </div>
          <article className='job-info mt-3'>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className='job-date'>{dates}</p>
            {duties.map((duty, index) => {
              return (
                <Fade key={index} direction='up' delay={index * 150}>
                  <div key={index} className='job-desc'>
                    <Fade key={index} direction='left' delay={index * 200}>
                      <FaAngleDoubleRight className='job-icon' />
                    </Fade>
                    <p>{duty}</p>
                  </div>
                </Fade>
              )
            })}
          </article>
        </div>
      </Fade>
    </section>
  )
}
