import React from 'react'
import { Tabs } from '../../components/ui/Tabs'
import { ThreeColumns } from '../../layout/ThreeColumns'

export const About = () => {
  return (
    <div className='about'>
      <ThreeColumns>
        <Tabs />
      </ThreeColumns>
    </div>
  )
}
