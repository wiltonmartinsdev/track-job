import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@TrackJob:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  function signIn(token: string, user: User) {
    localStorage.setItem('@TrackJob:token', token);
    localStorage.setItem('@TrackJob:user', JSON.stringify(user));
    setUser(user);
    navigate('/home');
  }

  function signOut() {
    localStorage.removeItem('@TrackJob:token');
    localStorage.removeItem('@TrackJob:user');
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);