import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { useState } from 'react';

export default function UserNavbar() {
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
            <Link to="/about" className="text-red-600 hover:underline">
              About
            </Link>
          </div>
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
          className="text-red-700"
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
            to="/about"
            className="text-red-600 hover:underline"
            onClick={toggleMenu}
          >
            About
          </Link>
        </div>
      )}
    </>
  );
}
