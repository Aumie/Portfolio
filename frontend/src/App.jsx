import './App.css'
import './dracula.css'
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { Blogs } from './pages/Blogs'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Notfound } from './pages/Notfound'
import { Layout } from './layout'
import { Detail } from './pages/Detail'
import { Write } from './pages/Write'
const router = createBrowserRouter([
  {
    path: '*',
    element: <Layout />,
    children: [{ path: '*', element: <Notfound /> }],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/blog',
        element: <Blogs />,
      },
      {
        path: '/blog/post/:slug',
        element: <Detail />,
      },
      {
        path: '/blog/post/write',
        element: <Write />,
      },
      {
        path: '/blog/post/:slug/edit',
        element: <Write />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

function App() {
  return (
    <div className='app'>
      <div className='custom-container'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
