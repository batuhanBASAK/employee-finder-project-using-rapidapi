import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-100 flex items-center justify-between">
      {/* Left side - Brand and Nav links */}
      <div className="flex items-center gap-6">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-red-700">
          Optiwisdom
        </Link>

        {/* Nav links */}
        <div className="flex gap-4">
          <Link to="/" className="text-red-600 hover:underline">Home</Link>
          <Link to="/about" className="text-red-600 hover:underline">About</Link>
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
  );
}
