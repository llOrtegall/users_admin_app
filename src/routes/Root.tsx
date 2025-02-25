import { useTheme } from '../context/ThemeProvider'
import { BgLight } from '../components/ui/BgLight'
import { BgDark } from '../components/ui/BgDark'
import { useAuth } from '../auth/AuthProvider'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Login from '../pages/Login'
import { Toaster } from 'sonner'
import { Suspense } from 'react'

export default function Root() {
  const { isAuthenticated, user } = useAuth()
  const { darkMode } = useTheme()

  if (!isAuthenticated || !user) {
    return <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>
  }

  return (
    <>  
      <NavBar />
      <>
        { darkMode ? <BgDark /> : <BgLight /> }
        <Outlet /> 
      </>
      <Toaster richColors position='top-right' duration={5000} visibleToasts={5}/>
    </>
  )
}