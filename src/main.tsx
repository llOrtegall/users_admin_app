import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AuthProvider } from './auth/AuthProvider'
import axios from 'axios'
import { ThemeProvider } from './context/ThemeProvider'

axios.defaults.baseURL = 'http://localhost:4000/api/v1'
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
