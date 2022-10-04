import React from 'react'
import cpp from './skills/cpp.svg'
import aws from './skills/aws.svg'
import cs from './skills/cs.svg'
import css from './skills/css.svg'
import py from './skills/python.svg'
import dj from './skills/django.svg'
import htm from './skills/html.svg'
import hw from './skills/hw.svg'
import js from './skills/js.svg'
import mongo from './skills/mongodb.svg'
import mysql from './skills/mysql.svg'
import reac from './skills/react.svg'
import unreal from './skills/unreal.svg'
import unity from './skills/unity.svg'
import bs from './skills/bs.svg'
import kube from './skills/kubernets.svg'
import docker from './skills/docker.svg'
import postgr from './skills/postgr.svg'

export const skills = [
  {
    title: 'Languages',
    logos: [py, cpp, js, htm, css, cs],
    tooltips: ['Python', 'C++', 'Javascript', 'HTML', 'CSS', 'C#'],
  },
  {
    title: 'Frameworks',
    logos: [reac, dj, bs],
    tooltips: ['React', 'Django', 'Bootstrap'],
  },
  {
    title: 'Database',
    logos: [mysql, postgr, mongo],
    tooltips: ['MySQL', 'Postgresql', 'MongoDB'],
  },
  {
    title: 'Infrastructure',
    logos: [hw, aws, kube, docker],
    tooltips: ['HuaweiCloud', 'AWS', 'Kubernetes', 'Docker'],
  },
  {
    title: 'Game Engines',
    logos: [unreal, unity],
    tooltips: ['Unreal Engine', 'Unity'],
  },
]
