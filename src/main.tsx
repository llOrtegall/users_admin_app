import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './auth/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import router from './routes';
import axios from 'axios';
import './index.css';

export const APP_NAME = import.meta.env.VITE_APP_NAME as string
export const URL_API = import.meta.env.VITE_URL_API as string

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
