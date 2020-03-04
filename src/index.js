import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { GlobalContextProvider } from './context/globalContext'
import { CookiesProvider } from 'react-cookie'
import { AuthContextProvider } from './context/AuthContext'

import './custom.scss'

ReactDOM.render(
  <GlobalContextProvider>
    <CookiesProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CookiesProvider>
  </GlobalContextProvider>, 
  document.getElementById('root')
)
