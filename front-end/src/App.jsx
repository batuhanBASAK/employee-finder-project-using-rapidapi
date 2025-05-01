import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import UserHomePage from "./pages/User";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import ProtectedRoutesAdmin from "./utils/ProtectedRoutesAdmin";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/adminlogin" element={<AdminLogin />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/user" element={<UserHomePage />} />
            </Route>

            <Route element={<ProtectedRoutesAdmin />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
