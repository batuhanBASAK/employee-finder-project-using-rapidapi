import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // 👈 Add a token state

  // Check for user login status (via token) on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Store token here in the context

      axios
        .get("http://localhost:3000/user-profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          setIsUserLoggedIn(true);
          setUser(res.data);
        })
        .catch(() => {
          // Checking if it's an admin token
          axios
            .get("http://localhost:3000/admin-profile", {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            })
            .then(() => {
              setIsAdminLoggedIn(true);
            })
            .catch((err) => {
              console.error("Admin token is invalid or expired:", err);
              setIsAdminLoggedIn(false);
            });

          setIsUserLoggedIn(false);
          setUser(null);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
    setUser(null);
    setToken(null); // clear token from context
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        isAdminLoggedIn,
        user,
        token, // Expose token here
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
