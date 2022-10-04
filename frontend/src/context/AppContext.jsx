import React, { useState, useContext } from 'react'

const AppContext = React.createContext()
//This is for global modal e.g. sidebar that can slide in/out
const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <AppContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AppContext.Provider>
  )
}
//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
