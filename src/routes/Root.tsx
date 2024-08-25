import { useAuth } from '../auth/AuthProvider';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom'
import Login from '../pages/Login';

export default function Root() {
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return <Login />
  }

  return (
    <>  
      <NavBar />
      <main>
        <Outlet /> 
      </main>
    </>
  )
}