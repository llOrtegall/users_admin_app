import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { LogoutAndDeleteToken } from '../services/loginServices';
import { APP_NAME, URL_API_LOGIN } from '../utils/contants';
import { User } from '../types/User';
import axios from 'axios';

interface IAuthContext {
  isAuthenticated: boolean
  user: User
  setUser: Dispatch<SetStateAction<User>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const InitialUser: User = { id: '', username: '', email: '', names: '', lastnames: '', company: '', process: '', sub_process: '' }

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(InitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const cookie = document.cookie

    if (!cookie && cookie.split('=')[0] !== APP_NAME) {
      setIsAuthenticated(false)
      setUser(InitialUser)
      return
    }

    axios.get(`${URL_API_LOGIN}/profile`, { params: { app: APP_NAME } })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data)
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          LogoutAndDeleteToken()
          setIsAuthenticated(false)
          setUser(InitialUser)
        }
      })
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ setUser, user, isAuthenticated, setIsAuthenticated  }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}