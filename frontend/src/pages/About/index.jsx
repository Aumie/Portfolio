import React from 'react'
import { SkillSlideIn } from '../../components/ui/SlideInX'
import { Tabs } from '../../components/ui/Tabs'
import { ThreeColumns } from '../../layout/ThreeColumns'

export const About = () => {
  return (
    <div className='about'>
      <ThreeColumns>
        <Tabs />
        <SkillSlideIn />
      </ThreeColumns>
    </div>
  )
}
