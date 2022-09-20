import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import './index.css'

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
                className='job-btn'
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
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}
