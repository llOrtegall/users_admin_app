import { useTheme } from '../context/ThemeProvider'
import { BgLight } from '../components/ui/BgLight'
import { BgDark } from '../components/ui/BgDark'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuth } from '../auth/AuthProvider'
import Login from '../pages/Login'

export default function Root() {
  const { darkMode } = useTheme()
  const { isAuthenticated } = useAuth()

  console.log(console.log())  

  if (!isAuthenticated) {
    return <Login />
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