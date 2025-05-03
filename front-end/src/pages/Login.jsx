import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Login() {
  const { isUserLoggedIn, isAdminLoggedIn, setUser, setIsUserLoggedIn, setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    if (isUserLoggedIn) navigate("/user");
    if (isAdminLoggedIn) navigate("/admin");
  }, [isUserLoggedIn, isAdminLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);

      const profileRes = await axios.get("http://localhost:3000/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(profileRes.data);
      setIsUserLoggedIn(true);
      navigate("/user");

    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
