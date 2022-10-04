import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context'
import './index.scss'
// import { AppProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AppProvider> */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    {/* </AppProvider> */}
  </React.StrictMode>
)
