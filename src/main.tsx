import { ThemeProvider } from './context/ThemeProvider'
import { AuthProvider } from './auth/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { URL_API } from './utils/contants'
import { StrictMode } from 'react'
import router from './routes'
import axios from 'axios'
import './index.css'


axios.defaults.baseURL = URL_API
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
