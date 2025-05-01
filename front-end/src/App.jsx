import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserHomePage from './pages/UserHomePage';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import ProtectedRoutes from './utils/ProtectedRoutes'
import ProtectedRoutesAdmin from './utils/ProtectedRoutesAdmin';
import { AuthProvider } from './utils/AuthContext';



function App() {




  return (
    <AuthProvider>
      <Router>
        <div className="2xl:container mx-auto" >
          <div className="p-4">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/adminlogin" element={<AdminLogin />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/user" element={<UserHomePage/>} />
              </Route>

              <Route element={<ProtectedRoutesAdmin />}>
                <Route path="/admin" element={<Admin/>} />
              </Route>


            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
