import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { axiosInstance } from '../utils'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const login = async (inputs) => {
    const res = await axiosInstance.post('/users/auth/token/', inputs)
    // print(res)
    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)
    axiosInstance.defaults.headers['Authorization'] =
      'JWT ' + localStorage.getItem('access_token')
    const resme = await axiosInstance.get('/users/me/')
    const user = localStorage.setItem('user', JSON.stringify(resme.data))
    // print(resme)
    setCurrentUser(user)
  }
  const logout = async (inputs) => {
    setCurrentUser(null)
    const body = {
      refresh_token: localStorage.getItem('refresh_token'),
    }
    await axiosInstance.post('/users/auth/token/blacklist/', body)
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    axiosInstance.defaults.headers = null
    window.location.reload()
  }

  // useEffect(() => {
  //   // if (localStorage.getItem('user'))
  //   localStorage.setItem('user', JSON.stringify(currentUser))
  // }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
