import React from 'react'
import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { Card } from '../Card'
import { Fade } from 'react-awesome-reveal'

export const CertBrand = ({ obj }) => {
  const [showInfo, setShowInfo] = useState(false)
  // console.log(obj)
  return (
    <article className='cert'>
      <header>
        <h4>{obj.title}</h4>
        <button className='sign-btn' onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <FaMinus className='rgb' /> : <FaPlus className='rgb' />}
        </button>
      </header>
      {showInfo &&
        obj.certs.map((title, index) => {
          // console.log(title)
          let nobj = {
            title: title,
            desc: obj.info[index],
            image: obj.images[index],
            file: obj.files[index],
          }
          return (
            <Fade key={index} delay={index * 200}>
              <Card parent='cert' obj={nobj} />
            </Fade>
          )
        })}
    </article>
  )
}
