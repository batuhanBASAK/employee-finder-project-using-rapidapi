import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoutesAdmin = () => {
  const { isAdminLoggedIn } = useAuth();

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutesAdmin;
