import { useAuth } from '../auth/AuthProvider';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom'
import Login from '../pages/Login';
import { BgDark } from '../components/ui/BgDark';
import { BgLight } from '../components/ui/BgLight';
import { useTheme } from '../context/ThemeProvider';
import { Toaster } from 'sonner';

export default function Root() {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  if(!isAuthenticated){
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