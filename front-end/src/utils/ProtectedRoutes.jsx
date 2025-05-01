import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {
  const { isUserLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or show a spinner
  }

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
