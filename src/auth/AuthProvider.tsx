import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import axios from 'axios';

interface PropsAuthContext {
  children: React.ReactNode;
}

interface IAuthContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: PropsAuthContext) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    axios.get('/profile', { params: { app: 'web-test' } })
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch((res) => {
        if(res.response.status === 401){
          setUser(null)
        }
        setUser(null);
      });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ setUser, user, isAuthenticated, setIsAuthenticated  }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}