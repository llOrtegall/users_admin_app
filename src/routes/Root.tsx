import { useTheme } from '../context/ThemeProvider'
import { BgLight } from '../components/ui/BgLight'
import { BgDark } from '../components/ui/BgDark'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function Root() {
  const { darkMode } = useTheme()

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