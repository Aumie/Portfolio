import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/ui/Footer'
import { Navbar } from '../components/ui/Navbar'
import ScrollToTop from '../components/ui/ScrollUp'
import { ThreeColumns } from './ThreeColumns'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      {children}
      <Footer />
    </>
  )
}

export { ThreeColumns }
