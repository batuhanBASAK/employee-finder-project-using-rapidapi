import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for user login status (via token) on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Checking if it's a user token
      axios
        .get("http://localhost:3000/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsUserLoggedIn(true);
          setUser(res.data); // { email: "user@example.com" }
        })
        .catch((err) => {
          console.error("Token is invalid or expired:", err);
          localStorage.removeItem("token");
          setIsUserLoggedIn(false);
          setUser(null);
        });

      // Checking if it's an admin token
      axios
        .get("http://localhost:3000/admin-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsAdminLoggedIn(true);
        })
        .catch((err) => {
          console.error("Admin token is invalid or expired:", err);
          setIsAdminLoggedIn(false);
        });
    }
  }, []);

  // 🔐 Logout function (handles both user and admin)
  const logout = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        user,
        setUser,
        logout, // 👈 include logout in context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
