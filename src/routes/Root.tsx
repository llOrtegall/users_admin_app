import { useTheme } from '../context/ThemeProvider';
import { Navigate, Outlet } from 'react-router-dom'
import { BgLight } from '../components/ui/BgLight';
import { BgDark } from '../components/ui/BgDark';
import { useAuth } from '../auth/AuthProvider';
import NavBar from '../components/NavBar';
import { Toaster } from 'sonner';

export default function Root() {
  const { isAuthenticated, user } = useAuth();
  const { darkMode } = useTheme();

  if(!isAuthenticated || user === null) {
    return <Navigate to='/login' />
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