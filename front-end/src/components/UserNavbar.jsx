import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext"; // ⬅️ import useAuth

export default function UserNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth(); // ⬅️ get logout
  const navigate = useNavigate(); // ⬅️ for redirect after logout

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    navigate("/"); // ⬅️ redirect to home
  };

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex p-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-red-700">
            Optiwisdom
          </Link>

          <div className="flex gap-4">
            <Link to="/" className="text-red-600 hover:underline">
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="md:hidden p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-red-700">
          Optiwisdom
        </Link>
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-red-700 hover:pointer"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-red-600 hover:underline"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="text-left text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
