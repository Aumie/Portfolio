import React, { useState } from 'react'
import './index.css'
import { Zoom, Slide } from 'react-awesome-reveal'
import { CertBrand } from './CertBrand'

const findCert = (brand, title, img, f) => {
  let dic = {
    title: title,
  }
  dic.certs = img
    .filter((image) => image.image_for.slice(0, 3) == brand)
    .map((img) => img.title)
  dic.info = img
    .filter((image) => image.image_for.slice(0, 3) == brand)
    .map((img) => img.desc)
  dic.images = img
    .filter((image) => image.image_for.slice(0, 3) == brand)
    .map((img) => img.image)
  dic.files = f
    .filter((file) => file.file_for.slice(0, 3) == brand)
    .map((f) => f.file)
  return dic
}
export const Certificates = ({ images, files }) => {
  var certs = []
  certs.push([findCert('HWC', 'Huawei Cloud Certifications', images, files)])
  certs.push([
    findCert('AWS', 'Amazon Web Services Certification', images, files),
  ])

  return (
    <React.Fragment>
      <div className='p-2 mx-auto  mt-5 text-center'>
        <Zoom direction='down'>
          <h2>Certifications</h2>
          <div className='underline'></div>
        </Zoom>
      </div>
      <div>
        <section className='info'>
          {certs.map((cert, index) => {
            return (
              <Slide direction='left' delay={index * 80} key={index}>
                <CertBrand obj={cert[0]} />
              </Slide>
            )
          })}
        </section>
      </div>
    </React.Fragment>
  )
}
