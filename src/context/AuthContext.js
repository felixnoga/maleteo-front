import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { isLoggedIn, whoAmI } from '../api/auth';

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userdetails, setUserDetails] = useState (null)

  const [cookies] = useCookies(['token']);
  const { token } = cookies;

  useEffect(() => {
    async function checkAuth() {
      try {
        console.log ("UseEffect de Nuevo Token en el Authentication Context")
        console.log ("El token es", token)
        await isLoggedIn(token);
        setIsAuthenticated(true);
        const user = await whoAmI (token)
        setUserDetails(user)
        console.log ("User set to prueba in Authentication context")
      } catch (e) {
        console.log ("Authenticated to false in Authentication context")
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, [token]);

  return (
    <AuthContext.Provider value={[isAuthenticated, userdetails ]}>
      {children}
    </AuthContext.Provider>
  );
}
