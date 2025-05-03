import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";  // Import the useAuth hook

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth(); // Access logout function from context

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex p-4 items-center justify-between bg-stone-50">
        {/* Left side - Brand and Nav links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-red-700">
            Brand
          </Link>

          <div className="flex gap-4">
            <Link to="/" className="text-red-600 hover:underline">
              Home
            </Link>
          </div>
        </div>

        {/* Logout Link */}
        <button
          onClick={logout}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </nav>

      {/* Mobile navbar */}
      <nav className="md:hidden p-4 flex items-center justify-between bg-stone-50">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-red-700">
          Optiwisdom
        </Link>

        {/* Hamburger Button */}
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
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-stone-50">
          <Link
            to="/"
            className="text-red-600 hover:underline"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <button
            onClick={logout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
