import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // null means not logged in
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
