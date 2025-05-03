import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isUserLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn } = useAuth(); // we need to update the admin login state
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) navigate("/user");
    if (isAdminLoggedIn) navigate("/admin");
  }, [isUserLoggedIn, isAdminLoggedIn, navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/adminlogin", {
        email,
        password,
      });

      // On successful login, store the token
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsAdminLoggedIn(true);

      // Redirect to the admin dashboard
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
