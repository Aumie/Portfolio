import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'
import { Home } from './pages/Home'
import { Blogs } from './pages/Blogs'
import ScrollToTop from './components/ui/ScrollUp'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Notfound } from './pages/Notfound'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <ScrollToTop />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Notfound />} />
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
