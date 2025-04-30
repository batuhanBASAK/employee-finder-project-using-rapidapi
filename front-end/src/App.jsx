import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="2xl:container mx-auto" >
        <Navbar />

        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
