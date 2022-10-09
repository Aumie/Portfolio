import React, { useEffect, useState } from 'react'
import { SkillSlideIn } from '../../components/ui/SkillSlideIn'
import { Tabs } from '../../components/ui/Tabs'
import { ThreeColumns } from '../../layout'
import { EducationCard } from '../../components/ui/EducationCard'
import { Certificates } from '../../components/ui/Certificates'
import { Languages } from '../../components/ui/Languages'
import { Loading } from '../../components/ui/Loding'
// import { AppContext, useGlobalContext } from '../../context'
import { job } from './data'
import { axiosInstance } from '../../utils'

export const About = () => {
  // const { openModal } = useGlobalContext(AppContext)

  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [value, setValues] = useState(0)
  const fetchData = async () => {
    const resf = await axiosInstance.get('/aum/file/')

    const resi = await axiosInstance.get('/aum/image/')
    setFiles(resf.data)
    setImages(resi.data)
    setJobs(job)

    // console.log(images)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <div className='about'>
      <ThreeColumns>
        <Tabs jobs={jobs} value={value} setValues={setValues} />
        <SkillSlideIn />
        <EducationCard />
        <Languages files={files} />
        <Certificates images={images} files={files} />
      </ThreeColumns>
    </div>
  )
}
