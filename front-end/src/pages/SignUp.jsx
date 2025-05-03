import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


export default function SignUp() {
  const {
    isUserLoggedIn,
    isAdminLoggedIn,
    setUser,
    setIsUserLoggedIn,
    setToken,

  } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isUserLoggedIn) navigate("/user");
    if (isAdminLoggedIn) navigate("/admin");
  }, [isUserLoggedIn, isAdminLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/signup", {
        name,
        surname,
        email,
        company,
        phone,
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

      setUser(profileRes.data); // e.g., { email: "user@example.com" }
      setIsUserLoggedIn(true);
      navigate("/user");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("User already exists");
      } else {
        console.error("Signup failed:", err);
        setError("An error occurred during signup.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border rounded"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company"
            className="p-2 border rounded"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
