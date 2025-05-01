import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex p-4 items-center justify-between">
        {/* Left side - Brand and Nav links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-red-700">
            Optiwisdom
          </Link>

          <div className="flex gap-4">
            <Link to="/" className="text-red-600 hover:underline">
              Home
            </Link>
          </div>
        </div>

        {/* Right side - Auth buttons */}
        <div className="flex gap-2">
          <Link
            to="/login"
            className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="md:hidden p-4 flex items-center justify-between">
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
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-red-600 hover:underline"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-red-600 hover:underline"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-red-600 hover:underline"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}
